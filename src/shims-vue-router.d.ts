import { Role } from '@/store/modules/permission';

declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // 页面的title
        roles?: Array<Role>; // 角色权限
    }
}
