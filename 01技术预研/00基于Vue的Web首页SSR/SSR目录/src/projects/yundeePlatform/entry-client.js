import Vue from 'vue'
// import 'es6-promise/auto'
import { createApp } from './main'
// 客户端特定引导逻辑……

Vue.mixin({
  // data () { // 全局mixin一个loading
  //   return {
  //     loading: false
  //   }
  // },
  beforeMount() {
    // 在挂载之前
    const { asyncData } = this.$options
    //当地址栏里面的url是非首页的情况下，这时候进入非首页，然后通过页面里面的跳转进入首页，就会出现数据没有获取到的情况。
    //这时候就需要由客户端获取数据，调用asyncData
    this.dataPromise = asyncData({
      store: this.$store,
      route: this.$route,
    })
  },
})

const { app, store, router } = createApp()

// 在挂载到应用程序之前，store 就应该获取到状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 激活客户端
router.onReady(() => {
  app.$mount('#app')
})

// // service worker
// function isLocalhost () {
//   return /^http(s)?:\/\/localhost/.test(location.href)
// }
//
// if ((location.protocol === 'https:' || isLocalhost()) && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
// }
