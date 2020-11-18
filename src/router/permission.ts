import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
import { Role } from "@/store/modules/permission";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if ((store.state as any).user.token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      // 必须
      const role = Role.teacher;
      store.dispatch("permission/generateRoutes", role);
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(to => {
  NProgress.done();
  document.title = to.meta.title || "0.0";
});
