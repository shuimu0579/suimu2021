import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [

    {
        path: '/threeMap',
        name: 'threeMap',
        component: () =>
            import('./views/platformProducts/threeMap.vue'),
        meta: {
            title: '三维地图',
        },
    },
    {
        path: '/alarmPage',
        name: 'alarmPage',
        component: () =>
            import('./views/platformProducts/alarmPage.vue'),
    },
    {
        // path: "/experienceCenter",
        path: "/",
        component: () =>
            import("./views/platformProducts/ExperienceCenter.vue"),
    },
    {
        path: "/demo",
        component: () =>
            import("./views/platformProducts/Demo.vue"),
    },
]

const routers = new Router({
    mode: 'history',
    base: '/',
    routes,
})
export default routers