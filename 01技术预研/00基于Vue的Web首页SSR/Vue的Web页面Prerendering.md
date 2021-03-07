# 预渲染 (SSR vs Prerendering)

> **Prerendering**--如何使用 prerender-spa-plugin 插件

- 参考文档： https://github.com/chrisvfritz/prerender-spa-plugin

- [Vue-cli 使用 prerender-spa-plugin 插件预渲染](https://www.jianshu.com/p/6a4c0b281e7f)
- [mode: 'history'中的注意点：需要后端同步配置](https://www.cnblogs.com/duanzhenzhen/p/11433923.html) 首先搜索引擎对于#后面的内容（锚）点一般是不收录的，所以需要先把 hash 模式改成 history 模式；**改成 history 模式后**，后台的配置上篇文章已经说明，地址https://www.cnblogs.com/duanzhenzhen/p/11585952.html

```shell
cnpm install prerender-spa-plugin --save
```

```js
// vue-config.js
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, 'dist'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ['/', '/product', '/about'],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar',
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event',
          }),
        }),
      ],
    }
  },
}

// main.js
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
}).$mount('#app')

// router.js
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
```

```shell
npm run build
```

> [处理 Vue 单页面 Meta SEO 的另一种思路](https://zhuanlan.zhihu.com/p/29148760?group_id=890298677627879424)

> 如果你想修改每个页面的 meta 信息，这里推荐使用 [vue-meta](https://vue-meta.nuxtjs.org/guide/)

```shell
npm i vue-meta
```

```js
//main.js
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  ...
})

// App.js
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Default Title',
      // all titles will be injected into this template
      titleTemplate: '%s | My Awesome Webapp'
    }
  }
</script>

// Home.vue
<template>
  <div id="page">
    <h1>Home Page</h1>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    metaInfo: {
      title: 'My Awesome Webapp',
      // override the parent template and just use the above title only
      titleTemplate: null
    }
  }
</script>

```

> 怎么展现静态页面--通过 node 搭建本地服务器

- [如何使用 node 搭建本地服务器（最详细）](https://blog.csdn.net/qq_37547964/article/details/111850835)
- [通过 node 搭建本地服务器](https://blog.csdn.net/A_bet_of_three_years/article/details/81263601?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-16.control&dist_request_id=1328602.41135.16150855258988799&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-16.control)
