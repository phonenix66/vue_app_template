import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouterMap } from './router.config.js';
// hack router push callback
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const createRouter = () => {
    return new VueRouter({
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRouterMap
    });
};

const router = createRouter();

/* const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
}) */

export function restRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
