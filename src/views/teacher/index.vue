<template>
  <div>teacher</div>
  <div>
    <button v-on:click="switchRole('admin')">admin</button>
    <button v-on:click="switchRole('school')">school</button>
    <button v-on:click="switchRole('teacher')">teacher</button>
  </div>
  <router-link to="/teacher/setting">setting</router-link>|
  <router-link to="/teacher/info">info</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import router, { asyncRoutes } from "@/router";
import { defineComponent } from "vue";
import { RouteRecordRaw } from "vue-router";
import { Role } from "@/store/modules/permission";
export default defineComponent({
  name: "Teacher",
  methods: {
    switchRole(role: string) {
      this.$store.dispatch("permission/generateRoutes", role);
    }
  }
});
</script>

<style lang="less" scoped></style>
