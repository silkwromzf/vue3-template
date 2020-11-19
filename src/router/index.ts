// import { Role } from '@/store/modules/permission';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/views/dashboard/index.vue';

/**
 * 权限级别
 * @enum
 */
export enum Role {
    // 管理员
    admin = 1,
    // 学校
    school,
    // 老师
    teacher,
    // 学生
    student
}

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            {
                path: '/',
                name: 'Components',
                component: () => import('../views/components/index.vue')
            },
            {
                path: 'confirm',
                name: 'Confirm',
                component: () => import('../views/components/confirm.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/404/index.vue')
    }
];

export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path: '/permission',
        name: 'Permission',
        component: () => import('../views/permission/index.vue'),
        children: [
            {
                path: 'school',
                name: 'School',
                meta: {
                    roles: [Role.admin, Role.school]
                },
                component: () => import('../views/permission/school/index.vue')
            },
            {
                path: 'teacher',
                name: 'Teacher',
                meta: {
                    roles: [Role.admin, Role.school, Role.teacher]
                },
                component: () =>
                    import('../views/permission/teacher/index.vue'),
                children: [
                    {
                        path: 'info',
                        name: 'TeacherInfo',
                        meta: {
                            roles: [Role.admin, Role.school]
                        },
                        component: () =>
                            import('../views/permission/teacher/info/index.vue')
                    },
                    {
                        path: 'setting',
                        name: 'TeacherSetting',
                        meta: {
                            roles: [Role.admin, Role.school, Role.teacher]
                        },
                        component: () =>
                            import(
                                '../views/permission/teacher/setting/index.vue'
                            )
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
