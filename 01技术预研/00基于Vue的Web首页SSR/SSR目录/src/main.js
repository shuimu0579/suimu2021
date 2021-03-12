import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
// 服务端渲染时, 将首页所有组件打包

import Empty from './components/Empty/Empty.vue'
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import ContactTips from './components/ContactTips/ContactTips.vue'

// 服务端渲染时, 路由页面打包
import Index from './views/Index.vue'
import ContactUs from './views/ContactUs.vue'

export function createApp() {
  const router = createRouter()
  const app = new Vue({
    components: {
      Empty,
      Header,
      Footer,
      ContactTips,

      Index,
      ContactUs,
    },
    router,
    render: h => h(App),
  })
  return { app, router }
}
