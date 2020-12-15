import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
import { auth } from '../utils/firebase.js';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition)
            return savedPosition;
        else
            return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser )
        next('/login');
    else
        next();
});

export default router;
