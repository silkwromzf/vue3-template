<template>
  <div>
    dashboard
    <button @click="logout">登出</button>
    <router-link to="/teacher">teacher</router-link>
    <router-link to="/noName">noName</router-link>
  </div>
  <Layout />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/components/layout/index.vue";

export default defineComponent({
  name: "Dashboard",
  components: { Layout },
  beforeMount() {
    this.$router.addRoute({
      path: "/teacher",
      name: "Teacher",
      meta: {
        role: ["admin", "school", "teacher"]
      },
      component: () => import("../teacher/index.vue")
    });
    const noname = this.$router.addRoute({
      path: "/noName",
      component: () => import("../noname/index.vue")
    });
    setTimeout(noname, 5000);
    console.log(this.$store.state);
    this.$store.dispatch("user/login", {
      id: 1,
      name: "11"
    });
    console.log(this.$store.state);
  },
  methods: {
    logout() {
      this.$router.push("/login");
    }
  }
});
</script>

<style lang="less" scoped></style>
