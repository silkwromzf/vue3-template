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

export default defineComponent({
  name: "Teacher",
  props: {},
  methods: {
    switchRole(role: string) {
      function initAsyncRoutes(
        role: string,
        asyncRoutes: Array<RouteRecordRaw>,
        parentName?: string | symbol
      ) {
        const add = (
          asyncRoute: RouteRecordRaw,
          parentName?: string | symbol
        ) => {
          parentName
            ? router.addRoute(parentName, asyncRoute)
            : router.addRoute(asyncRoute);
        };
        asyncRoutes.forEach(asyncRoute => {
          const { name, meta, children } = asyncRoute;
          // 如果未设置路由name的时候, 默认当前未添加该路由
          const has = !!name && router.hasRoute(name);
          // 如果没有设置meta?.role属性 默认是全局路由
          if (
            (meta && (meta.role.includes(role) || meta.role === undefined)) ||
            !meta
          ) {
            if (!has) {
              add(asyncRoute, parentName);
            }
            children && initAsyncRoutes(role, children, name);
          } else {
            // 权限路由必须给的name属性
            name && router.removeRoute(name);
          }
        });
      }
      initAsyncRoutes(role, asyncRoutes);
      router.replace(router.currentRoute.value.path);
      console.log(router.currentRoute);
    }
  }
});
</script>

<style lang="less" scoped></style>
