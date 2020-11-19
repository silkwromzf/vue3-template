import router from '@/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if ((store.state as any).user.token) {
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            if ((store.state as any).user.role) {
                next();
            } else {
                try {
                    await store.dispatch('user/getUserInfo');
                    // 动态路由问题 在未获取之前可能匹配到空
                    next({
                        path: to.path,
                        replace: true
                    });
                } catch (error) {
                    store.dispatch('user/resetToken');
                    next('/login');
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    }
});

router.afterEach(to => {
    NProgress.done();
    document.title = to.meta.title || '调课';
});
