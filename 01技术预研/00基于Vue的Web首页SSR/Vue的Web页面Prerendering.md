# 预渲染 (SSR vs Prerendering)

> **Prerendering**--如何使用 prerender-spa-plugin 插件

- 参考文档： https://github.com/chrisvfritz/prerender-spa-plugin

- [Vue-cli 使用 prerender-spa-plugin 插件预渲染](https://www.jianshu.com/p/6a4c0b281e7f)

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
      plugins:  [
        new PrerenderSPAPlugin({
            // 生成文件的路径，也可以与webpakc打包的一致。
            // 下面这句话非常重要！！！
            // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
            // staticDir: path.join(__dirname, "dist/yundeePlatform"),
            // 项目实践可知：目录层次大于一级,也是可以的，比如"dist/yundeePlatform"
            staticDir: path.join(__dirname, "dist/yundeePlatform"),
            // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
            routes: ["/", "/appmarket"],
            // 这个很重要，如果没有配置这段，也不会进行预编译
            renderer: new Renderer({
                inject: {
                    foo: "bar",
                },
                headless: false,
                // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                renderAfterDocumentEvent: "render-event",
                // 填坑：属性 executablePath 人为指定运行绑定的 Chromium 版本，chrome.exe在本机中的位置
                executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
            }),
        }),
      ];
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
- [mode: 'history'中的注意点：需要后端同步配置]( https://www.cnblogs.com/duanzhenzhen/p/11433923.html)
- 首先搜索引擎对于\#后面的内容（锚）点一般是不收录的，所以需要先把 hash 模式改成 history 模式；**改成 history 模式后**，后台的配置上篇文章已经说明，地址 https://www.cnblogs.com/duanzhenzhen/p/11585952.html

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
```

```shell
npm run build
```

> 使用 prerender-spa-plugin 这个插件时候的踩坑记录

- [看到 Puppeteer Api 文档时，它提供一个属性 executablePath 人为指定运行绑定的 Chromium 版本](https://huzizi.com/vue-cli-3-0-shi-yong-prerender-spa-plugin-yu-xuan-ran-yu-dao-de-mo-ming-qi-miao-de-keng/)
- 报错信息如下所示：

```shell
[Prerenderer - PuppeteerRenderer] Unable to start Puppeteer(node:940) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'close' of null    at PuppeteerRenderer.destroy
```

> 怎么展现静态页面--通过 node 搭建本地服务器(重要)

- 在本地服务器中验证home、appmarket 是否显示正常，包括样式和点击事件等等。 有了自己搭建的本地服务器之后，就很方便了。

- [如何使用 node 搭建本地服务器（最详细）](https://blog.csdn.net/qq_37547964/article/details/111850835)
- [通过 node 搭建本地服务器](https://blog.csdn.net/A_bet_of_three_years/article/details/81263601?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-16.control&dist_request_id=1328602.41135.16150855258988799&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-16.control)

> [处理 Vue 单页面 Meta SEO 的另一种思路](https://zhuanlan.zhihu.com/p/29148760?group_id=890298677627879424)

```shell
npm i vue-meta-info
```

```js
//main.js
import Vue from 'vue'
import Router from 'vue-router'
import MetaInfo from 'vue-meta-info'

Vue.use(Router)
Vue.use(MetaInfo)

export default new Router({
  ...
})
```

> title 或者 meta同步加载的情况

```js
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
      title: 'My Example Home', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example Home'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com1/'
      }]
    }
  }
</script>

// AppMarket.js
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'AppMarket',
    metaInfo: { // metaInfo在这里是一个对象
      title: 'My Example AppMarket', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example AppMarket'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>
```

- 如果如果你的 title 或者 meta 是异步加载的，就需要如下这样了

```js
// main.js
import globalConfig from "@/api/globalConfig";
let globalConf = new globalConfig();
Vue.prototype.$globalConfig = globalConf;

// App.vue
export default {
    created() {
        this.getGlobalConfig();
    },
    methods: {
        getGlobalConfig() {
            const data = {
                vtenant: cq_config.platformid,
            };
            request
                .post(cq_config.yundee_center_url + "/get/system/config", JSON.stringify(data), {
                    withCredentials: false,
                    headers: {
                        "Content-Type": "application/json",
                        traceId: util.setUuid(),
                    },
                })
                .then(res => {
                    if (res.success && res.data) {
                        let { data } = res;
                        this.$globalConfig.init(data);  // $globalConfig 就是main.js里面的全局属性 Vue.prototype.$globalConfig
                    }
                });
        },
    },
};

// Home.vue
<template>
  <div id="page">
    <h1>Home Page</h1>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    metaInfo() {  //metaInfo在这里是一个函数
        return {
            title: this.$globalConfig.title, // set a title
            meta: [
                {
                    // set meta
                    name: "keywords",
                    content: this.$globalConfig.keywords,
                },
                {
                    // set meta
                    name: "description",
                    content: this.$globalConfig.description,
                },
            ],
            link: [
                {
                    // set link
                    rel: "icon",
                    href: this.$globalConfig.icon,
                },
            ],
        };
    }
  }
</script>

// AppMarket.js
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'AppMarket',
    metaInfo() {
        return {
            title: this.$globalConfig.title01, // set a title
            meta: [
                {
                    // set meta
                    name: "keywords",
                    content: this.$globalConfig.keywords01,
                },
                {
                    // set meta
                    name: "description",
                    content: this.$globalConfig.description01,
                },
            ],
            link: [
                {
                    // set link
                    rel: "icon",
                    href: this.$globalConfig.icon01,
                },
            ],
        };
    }
  }
</script>
```
