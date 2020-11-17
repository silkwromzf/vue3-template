import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/dashboard/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/",
        name: "Components",
        component: () => import("../views/components/index.vue")
      },
      {
        path: "/confirm",
        name: "Confirm",
        component: () => import("../views/components/confirm.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("../views/404/index.vue")
  }
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/permission",
    name: "Permission",
    component: () => import("../views/permission/index.vue"),
    children: []
  },
  {
    path: "/school",
    name: "School",
    meta: {
      role: ["admin", "school"]
    },
    component: () => import("../views/school/index.vue")
  },
  {
    path: "/teacher",
    name: "Teacher",
    meta: {
      role: ["admin", "school", "teacher"]
    },
    component: () => import("../views/teacher/index.vue"),
    children: [
      {
        path: "info",
        name: "TeacherInfo",
        meta: {
          role: ["admin", "school"]
        },
        component: () => import("../views/teacher/info/index.vue")
      },
      {
        path: "setting",
        name: "TeacherSetting",
        meta: {
          role: ["admin", "school", "teacher"]
        },
        component: () => import("../views/teacher/setting/index.vue")
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);
  next();
});
export default router;
