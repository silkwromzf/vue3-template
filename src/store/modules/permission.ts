import { ModuleState } from "@/store/types";
import { RouteRecordRaw } from "vue-router";
import router, { routes, asyncRoutes } from "@/router";
import { cloneDeep } from "lodash";
/**
 * 权限级别
 * @enum
 */
export enum Role {
  // 管理员
  admin,
  // 学校
  school,
  // 老师
  teacher,
  // 学生
  student
}

type RouteRecordName = string | symbol;

/**
 * 添加动态路由
 * @param { RouteRecordRaw } route
 * @param { RouteRecordName | undefined } parentName
 */
function addRoute(route: RouteRecordRaw, parentName?: RouteRecordName) {
  const has = router.hasRoute(route.name as RouteRecordName);
  if (has) return;
  parentName ? router.addRoute(parentName, route) : router.addRoute(route);
}

/**
 * 添加所有路由 name必须，如果没有会自动添加symbol
 * @param { Role } role
 * @param { Array<RouteRecordRaw> } asyncRoutes
 * @param { RouteRecordName } parentName
 * @returns { Array<RouteRecordRaw> }
 */
function addRoutes(
  asyncRoutes: Array<RouteRecordRaw>,
  role?: Role,
  parentName?: RouteRecordName
): Array<RouteRecordRaw> {
  return asyncRoutes.map(asyncRoute => {
    let { name } = asyncRoute;
    // 如果未设置路由name的时候
    name = name ? name : Symbol();

    const route: RouteRecordRaw = {
      ...asyncRoute,
      name
    };

    const { meta, children } = route;
    // 未设置roles 默认全部可见
    if (!meta || !meta.roles || (role && meta.roles.includes(role))) {
      addRoute(route, parentName);
      route.children = children && addRoutes(children, role, name);
    } else {
      router.removeRoute(name);
    }
    return route;
  });
}

export interface PermissionState {
  routes: Array<RouteRecordRaw>;
  dynamicRoutes: Array<RouteRecordRaw>;
}

const permission: ModuleState<PermissionState> = {
  namespaced: true,
  state: () => {
    return {
      routes: routes,
      dynamicRoutes: asyncRoutes
    };
  },
  mutations: {
    SET_DYNAMIC_ROUTES(state, dynamicRoutes: Array<RouteRecordRaw>) {
      state.dynamicRoutes = dynamicRoutes;
    }
  },
  actions: {
    generateRoutes({ state, commit }, role?: Role) {
      const dynamicRoutes = addRoutes(state.dynamicRoutes, role);
      // !!!! bug
      router.replace(router.currentRoute.value);
      commit("SET_DYNAMIC_ROUTES", dynamicRoutes);
    }
  }
};

export default permission;