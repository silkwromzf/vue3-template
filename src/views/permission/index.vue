<template>
  <div class="permission">
    permission
    <button v-on:click="switchRole('admin')">admin</button>
    <button v-on:click="switchRole('school')">school</button>
    <button v-on:click="switchRole('teacher')">teacher</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router, { routes, asyncRoutes } from "@/router";
export default defineComponent({
  name: "Permission",
  methods: {
    switchRole(role: string) {
      console.log("role", role);
      console.log("routes", routes);
      console.log("asyncRoutes", asyncRoutes);
      const dynamicRoutes = routes.concat(asyncRoutes);
      console.log("dynamicRoutes", dynamicRoutes);
      router.addRoute(dynamicRoutes as any);
    }
  }
});
</script>

<style lang="less" scoped>
.permission {
}
</style>
