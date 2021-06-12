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
    // 如果拥有asyncData和data为空的时候,进行数据加载
    // 触发loading加载为true,显示加载器不显示实际内容
    // this.loading = true
    // 为当前组件的dataPromise赋值为这个返回的promise，通过判断这个的运行情况来改变loading状态或者进行数据的处理 (在组件内通过this.dataPromise.then保证数据存在)
    // this.dataPromise = asyncData({ store, route: router.currentRoute })
    this.dataPromise = asyncData({
      store: this.$store,
      route: this.$route,
    })
    // this.dataPromise.then(() => {
    //   this.loading = false
    // }).catch(e => {
    //   this.loading = false
    // })
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
