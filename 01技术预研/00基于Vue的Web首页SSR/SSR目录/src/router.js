import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    routes: [
      // 路由级别代码拆分
      // 这将为此路由生成单独的块（关于[hash].js）
      // 当路由被访问时延迟加载
      {
        path: '/',
        name: 'Index',
        meta: {
          isAuth: false,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ './views/Index.vue'),
      },
      {
        path: '/',
        name: 'ContactUs',
        meta: {
          isAuth: false,
        },
        component: () =>
          import(/* webpackChunkName: "contactus" */ './views/ContactUs.vue'),
      },
    ],
  })
  return router
}
