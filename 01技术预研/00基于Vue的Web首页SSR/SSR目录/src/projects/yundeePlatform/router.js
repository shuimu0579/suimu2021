import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

const cq_config = require('../../../public/Config')
import GLOBAL from '../../utils/constant'
import cookies from '../../utils/cookies'
import { util } from '../../utils/util'
import axios from 'axios'

Vue.use(Router)
Vue.use(Meta)

const routes = [
  // 路由级别代码拆分
  // 这将为此路由生成单独的块（关于[hash].js）
  // 当路由被访问时延迟加载
  {
    path: '/',
    name: 'home',
    meta: {
      isAuth: false,
    },
    component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
  },
  {
    path: '/test',
    name: 'Index',
    meta: {
      isAuth: false,
    },
    component: () => import(/* webpackChunkName: "test" */ './views/Index.vue'),
  },
  {
    path: '/testId',
    name: 'ContactUs',
    meta: {
      isAuth: false,
    },
    component: () =>
      import(/* webpackChunkName: "contactus" */ './views/ContactUs.vue'),
  },
  {
    path: '/supplychain',
    name: 'SupplyChain',
    meta: {
      isAuth: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "supplychain" */ './views/platformProducts/SupplyChain.vue'
      ),
  },
]

console.log('app_dev', process.env.VUE_APP_DEV)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    base: cq_config.baseURL,
    routes,
    scrollBehavior() {
      return {
        x: 0,
        y: 0,
      }
    },
  })
  // 全部页面需要先用guest用户登录苍穹后方可请求数据
  router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
      from.name
        ? next({
            name: from.name,
          })
        : next('/404')
    } else {
      if (to.query.ticket) {
        let traceId = util.setUuid()
        const data = {
          ticket: to.query.ticket,
          vtenant: cq_config.platformid,
        }
        axios
          .post(
            cq_config.yundee_center_url + '/rest/get/user/token',
            JSON.stringify(data),
            {
              withCredentials: false,
              headers: {
                traceId: traceId,
                'Content-Type': 'application/json',
              },
            }
          )

          .then(res => {
            const data = res.data
            if (data.success) {
              cookies.clearAllCookie()
              cookies.setCookieData(GLOBAL.USER_COOKIE_KEY, data.data.token)
              cookies.setCookieData(
                GLOBAL.USER_COOKIE_TENANTID_KEY,
                data.data.token
              )
              cookies.setCookieData(
                cq_config.platformid + 'ticket',
                to.query.ticket
              )
            }

            let path = decodeURIComponent(to.fullPath)
            if (path.indexOf(GLOBAL.urlJoinIdentifier) > -1) {
              const paramsObj = util.urlParamsToObject(
                path,
                GLOBAL.urlJoinIdentifier
              )
              let ParamsString = util.objectToUrlParams(paramsObj)
              path = path.split('?')[0] + ParamsString
              console.log('ParamsString...', ParamsString)
              console.log('pageUrl...', path)
            }
            next(path.split('ticket')[0])
          })
      } else {
        // 验证是否过期
        if (cookies.getCookieData(cq_config.platformid + 'ticket')) {
          const data = {
            ticket: cookies.getCookieData(cq_config.platformid + 'ticket'),
            vtenant: cq_config.platformid,
          }
          axios
            .post(
              cq_config.yundee_center_url + '/rest/check',
              JSON.stringify(data),
              {
                withCredentials: false,
                headers: {
                  traceId: util.setUuid(),
                  'Content-Type': 'application/json',
                },
              }
            )
            .then(res => {
              const data = res.data
              if (!data.success) {
                cookies.clearAllCookie()
              }
              next()
            })
        } else {
          next()
        }
      }
    }
  })
  return router
}
