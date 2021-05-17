# SSR 服务端渲染

- [彻底理解服务端渲染 - SSR 原理](https://github.com/yacan8/blog/issues/30) 这里有创建 store 实例的 mock 数据， 我们 mock 一个远程服务函数 fetchItem，用于查询对应 item。
- [vue-cli3 搭建的 vue 改造成 SSR 项目](https://blog.csdn.net/weixin_40965293/article/details/106619172)

- [Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)

## SSR 目录项目分析

- `package.json`里面的 build:yundee 和 dev:yundee 分别调用的是`server目录`下的 ssr.js，而 ssr.js 又调用了 dev.ssr.js(DEV 环境下的服务端渲染)和 server.js(生产环境下的服务端渲染),**先执行 dev.ssr.js**，生成最新的 vue-ssr-server-bundle.json 和 获取最新的 vue-ssr-client-manifest.json；也就是说先执行`dev:yundee`,再执行`build:yundee`； 也就是说先执行`npm run serves yundeePlatform yundee`、再执行`npm run builds yundeePlatform yundee`。

## SSR 过程中的注意点：

> 怎么编写在浏览器端和在服务端都可以运行的代码？--也就是**通用代码**、**同构代码**、**NodeJS 同构直出**

- 客户端可以将数据进行响应式；在服务器端进行响应式是多余的--因为我们开始渲染时，在服务器上，我们的应用程序就已经解析完成其状态。
- 由于服务器端渲染没有动态更新，所有的生命周期函数中，只有 `beforeCreate` 和 `create` 可以在 SSR 渲染中被调用。所以我们在编写同构代码的时候，不能在`beforeCreate` 和 `create`设置 setInterval、addEventListener 等产生全局副作用的代码,而是应当设置在`beforeMounted`、`mounted`生命周期钩子里面。
- 通用代码不可接受特定平台 API,所以在全局代码中使用了`window`、`document`或者直接操作 DOM 的时候，在 node 服务器端是会报错的；与之相对的，`axios`这样的 HTTP 客户端，可以向服务器和客户端都暴露相同的 API,就很方便写出通用代码了。
- 大多数`自定义指令`都是直接操作 DOM,因此可能在服务端渲染的时候导致错误。解决办法就是[对于自定义指令，允许提供服务器端实现](https://ssr.vuejs.org/zh/api/#directives)

> 怎么避免状态单例

- 在多个请求之间使用一个共享的实例，很容易导致交叉请求状态污染--解决办法就是，不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例。记住：Vue 实例，还有 router、store 和 event bus 等实例 都需要这样创建。

> SSR 的构建步骤(以 SSR 目录这个项目为例)

- 通用 entry--main.js
- entry-client.js，这个客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中
- entry-server.js，使用 default export 导出函数，作用是返回一个新的实例 vm = new Vue()，并在每次渲染中重复调用此函数。

> 构建配置：分为服务器配置和客户端配置

- 服务器配置，是用于生成传递给 createBundleRenderer 的 server bundle，也就是`SSR目录`项目中的 vue-ssr-server-bundle.json。相当于`SSR目录`项目中的 vue.config.js 里面的服务器部分配置

- 客户端配置 (Client Config)，生成 clientManifest(也就是 vue-ssr-client-manifest.json)。

## [重要的！！！]

- 怎么做到部分页面的SSR  `router.get('/(.*)', handleRequest)`
  
```js
// server.js
// 参考 `./SSR目录` 文件夹

// 第 3 步：添加一个中间件来处理所有请求
const handleRequest = async (ctx, next) => {
  const url = ctx.request.url

  // 哪些页面是需要SSR的，在这里配置
  const urlListBySSR = [
    '/',
    '/contact',
    '/erpConnect',
    '/erpDoctor',
    '/supplychain',
    '/iotmanufacture',
    '/5gandai',
    '/bibigdata',
    '/consult',
  ]
  let isSSR = urlListBySSR.some(item => item === url)

  if (isSSR) {
    const cacheable = isCacheable(url)
    if (url.includes('.')) {
      ctx.res.setHeader('Access-Control-Allow-Origin', '*')
      return await send(ctx, url, { root: path.resolve(__dirname, '../dist') })
    }
    if (cacheable) {
      const hit = microCache.get(url)
      if (hit) {
        return ctx.res.end(hit)
      }
    }
  }
  const context = {
    title: '云镝工业互联网',
    url,
    isSSR,
    isWebp: ctx.req.headers.accept.toString().indexOf('image/webp') > -1,
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context)
  isSSR && microCache.set(url, html) // 设置当前缓存页面的内容
  ctx.body = html
}

// 让所以的路径都进来handleRequest

router.get('/(.*)', handleRequest)
// router.get("*", handleRequest);  这样有问题，需要get(":splat*"
// router.get(":splat*", handleRequest);

// // router.get("/", handleRequest);
// router.get("/erpConnect", handleRequest);
// router.get("/erpDoctor", handleRequest);

// router.get("/supplychain", handleRequest);
// router.get("/iotmanufacture", handleRequest);
// router.get("/5gandai", handleRequest);
// router.get("/bibigdata", handleRequest);
// router.get("/consult", handleRequest);

module.exports = router

```

```js
//router.js

// 参考 `./SSR目录` 文件夹
router.beforeEach((to, from, next) => {

// 很重要
const urlListBySSR = [
    '/',
    '/erpConnect',
    '/erpDoctor',
    '/supplychain',
    '/iotmanufacture',
    '/5gandai',
    '/bibigdata',
    '/consult',
]
if (urlListBySSR.some(item => item === to.path)) {
    window.location.href = to.path
} else {
    next(path.split('ticket')[0])
}
// next(path.split('ticket')[0])
})
```

- 对于不想要走SSR的页面，点击的时候**不能是a标签**，**哪怕设置的不是a标签，比如是span标签，也加了click事件，但是click回调事件里面用了window.location.href的话，也是会走SSR的**，所以click回调事件里面不能有window.location.href方法，而是用`this.$router.push({path: url});`

**`@select="openUrl`和下面的代码是关键**

```js
if (data.hrefTarget === 0) {
        let url = `/${menuNumber}`;
        if (menuNumber === "home") {
            // window.location.reload();
            if (typeof window === "object") window.location.href = "/";
        } else if (
            menuNumber === "supplychain" ||
            menuNumber === "iotmanufacture" ||
            menuNumber === "5gandai" ||
            menuNumber === "bibigdata" ||
            menuNumber === "consult"
        ) {
            if (typeof window === "object") window.location.href = url;
        } else {
            this.$router.push({
                path: url,
            });
        }

        // if (typeof window === "object") window.location.href = data.url;
    }
```

```html
<el-menu
                class="page"
                :default-active="curSelect"
                @select="openUrl"
                mode="horizontal"
                :unique-opened="true"
                text-color="#ffffff"
                active-text-color="#ffffff"
                scrollbar="no"
            >
                <template v-for="(menu, key) in menuArr">
                    <el-submenu
                        popper-class="submenuList"
                        v-if="menu.children"
                        :key="key"
                        :index="menu.menuUrl ? menu.menuUrl : '/' + menu.menuNumber"
                        :popper-append-to-body="false"
                    >
                        <template slot="title">
                            <h2 class="menuEnterUrl">
                                <span>{{ menu.menuName }}</span>
                            </h2>
                        </template>
                        <el-menu-item
                            v-for="(childItem, key) in menu.children"
                            :key="key"
                            :disabled="childItem.disabled"
                            :index="childItem.menuUrl ? childItem.menuUrl : '/' + childItem.menuNumber"
                        >
                            <h2 class="menuEnterUrl">
                                <a :href="childItem.url === '' ? '#' : childItem.url">
                                    <span>{{ childItem.menuName }}</span>
                                </a>
                            </h2>
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item
                        v-else
                        :key="key"
                        :disabled="menu.disabled"
                        :index="menu.menuUrl ? menu.menuUrl : '/' + menu.menuNumber"
                    >
                        <h2 class="menuEnterUrl" slot="title">
                            <a
                                v-if="
                                    menu.menuNumber === 'home' ||
                                        menu.menuNumber === 'supplychain' ||
                                        menu.menuNumber === 'iotmanufacture' ||
                                        menu.menuNumber === '5gandai' ||
                                        menu.menuNumber === 'bibigdata' ||
                                        menu.menuNumber === 'consult'
                                "
                                :href="menu.url === '' ? '#' : menu.url"
                            >
                                <span>{{ menu.menuName }}</span>
                            </a>
                            <span v-else>{{ menu.menuName }}</span>
                        </h2>
                    </el-menu-item>
                </template>
            </el-menu>
```

```js
openUrl(key) {
let _self = this;
const menuNumber = key.charAt(0) === "/" ? key.slice(1) : key;
_self.getMenuNumber(menuNumber);
},
getMenuNumber(menuNumber, subfixType) {
let _self = this;
const data = {
menuNumber,
vtenant: this.cq_config.platformid,
casTicket: cookieHelper.getCookieData(this.cq_config.platformid + "ticket"),
subfixType,
};
getMenuNumberUrl(data).then(res => {
let { data } = res;
switch (data.status) {
case 0:
    if (data.hrefTarget === 0) {
        let url = `/${menuNumber}`;
        if (menuNumber === "home") {
            // window.location.reload();
            if (typeof window === "object") window.location.href = "/";
        } else if (
            menuNumber === "supplychain" ||
            menuNumber === "iotmanufacture" ||
            menuNumber === "5gandai" ||
            menuNumber === "bibigdata" ||
            menuNumber === "consult"
        ) {
            if (typeof window === "object") window.location.href = url;
        } else {
            this.$router.push({
                path: url,
            });
        }

        // if (typeof window === "object") window.location.href = data.url;
    } else {
        if (typeof window === "object") window.open(data.url);
    }
    break;
}
}
}

```


- element-ui 中 el-tab el-tab-pane 这个组件的使用时没有问题的，所以没出效果是别的地方出问题了，上述组件本身是没有问题的。

- 在SSR的时候，`router.getMatchedComponents()`只能获取到页面组件(Home.vue)的路由，获取不到页面组件里面的子组件(DemandComponent.vue)的路由，所以`asyncData`在`DemandComponent`里面设置是无效的，所以`asyncData`只能在页面组件(Home.vue)里面设置。那么纸组件怎么获得数据呢？ 通过props从页面组件(Home.vue)将数据传递下来，直到子组件(DemandComponent.vue)。

- 在SSR调用接口的时候， 接口地址一定要写全面，`http://172.168.23:8080/test`  不然node里面无法调用接口,也就是接口报错

- 如果要在Home.vue里面的子组件Header.vue里面使用`asyncData`的话,那么必须在`childred里面加上Header.vue的路由配配置`,不然`router.getMatchedComponents()`根本捕获不到`Header.vue`里面定义的`asyncData`

```js
// router.js
// 错误的示例
{
    path: "/",
    name: "home",
    meta: {
        isAuth: false,
    },
    component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
},

```

```js
// router.js
//正确的示例
{
        path: "/",
        name: "home",
        meta: {
            isAuth: false,
        },
        component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
        children: [  // childred里面加上Header.vue的路由配配置
            {
                path: "",
                component: () => import(/* webpackChunkName: "home" */ "../../components/layout/Header.vue"),
            },
        ],
    },
```
  

- 每次引入新页面的时候，一定要在main.js的components里面引入Index(如果页面组件Index里面引入了ContactTips，一定也要引入ContactTips)，不然就会发生`document is not defined`的错误

```js
export function createApp() {
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    components: {
      Empty,
      Header,
      Footer,
      ContactTips, //引入Index页面用到的组件

      Index, //引入页面
      ContactUs,
    },
    router,
    store,
    render: h => h(App),
  })
  return { app, router, store }
}
```

- 在引入新页面的时候，也要写记得在新页面里面加上metaInfo函数,不然`meta.text()`可能是defined。

```js
// server.js

// router.get(':splat*', handleRequest) // 用':splat*' 替代 ‘*’  这样操作貌似不行，需要下面这样显式的确定需要SSR的路由
//重要！！！ 哪些页面需要 走SSR 都在这里面定义-- 这样就能做到SSR渲染特定的页面, 爬虫也能够只爬取特定的页面
router.get('/', handleRequest)
router.get('/contact', handleRequest)
```

```js
//比如根目录采用了SSR, 那么就要在Index里面添加metaInfo函数
<template>
  <div>
    <div>id: {{ item.id }}</div>
    <div>name: {{ item.name }}</div>
  </div>
</template>
<script>
export default {
  asyncData({ store, route }) {
    console.log('store...', store)
    console.log('route...', route)
    // 触发 action 后，会返回 Promise
    return store.dispatch('testModule/fetchItems', route.query.id || 1)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      const { item } = this.$store.state.testModule
      return item
    },
  },
  // ！！ 只要运用了vue-meta的页面 首先要添加以下代码
  metaInfo() {
    const title = 'Index'
    return {
      title,
      meta: [
        { name: 'description', content: title },
        { name: 'keywords', content: title },
      ],
    }
  }
}
</script>

<style scoped></style>
```

- 正常引入elementUI是没有问题的，不会引起`document is not defined`的错误。有错误肯定是别的引起的，不是elementUI的锅

- 本地代码中有`window`、`document`、`sessionStorage`、`localStorage`的，需要加上`typeof XXX === 'object'`的判断，不然就会报错 ，类似`document is not defined`

- SSR渲染的组件里面，不能出现`v-show` 等指令，还有`自定义指令`也不能出现，这些指令都会操作DOM元素，在走SSR渲染的时候就会报错，SSR流程进行不下去（只是`v-if`貌似可以出现）。使`visibility: visible`和`visibility: hidden`，同时采用鼠标划入划出事件，来控制 dom的显示或隐藏。(el-dropdown组件里面可以使用v-show 却不能使用v-if 有点奇怪！！！)

## 问题分析

- [解决 vue 项目运行过程中内存泄漏问题](https://zhuanlan.zhihu.com/p/112763489)
[‘“node --max-old-space-size=4096“‘ 不是内部或外部命令，也不是可运行的程序 或批处理文件。](https://blog.csdn.net/qq_41614928/article/details/115835337)

- [DONE!!!]head 标签里面的 meta 标签，其中的 keywords 和 description 怎么动态设置，以利于 SEO？ 可以参考 [Vue2 SSR 渲染, 如何根据不同页面修改 meta?](https://www.mmxiaowu.com/article/585005b24b8f0c283f7ce0d1) 或者 [https://www.digitalocean.com/community/tutorials/vuejs-vue-seo-tips](https://www.digitalocean.com/community/tutorials/vuejs-vue-seo-tips)

```js
// router.js  目录：01技术预研\00基于Vue的Web首页SSR\SSR目录\src\router.js
import Meta from 'vue-meta'
Vue.use(Meta)
```

- [DONE!!! -- 解决 build 成功之后，localhost:port 发现控制台有报错，加载不到客户端构建 css 和 js，报 404 的问题 ](https://blog.csdn.net/qq_43624878/article/details/107739956)

```js
// koa-mount可以和koa-static结合，以实现和express一样的静态服务请求前缀的功能
// 路径：01技术预研\00基于Vue的Web首页SSR\SSR目录\server\ssr.js
const resolve = file => path.resolve(__dirname, file)
app.use(koaMount('/dist', koaStatic(resolve('../dist'))))

//vue.config.js   01技术预研/00基于Vue的Web首页SSR/SSR目录/vue.config.js
publicPath: '/dist', //publicPath为`/dist` 这句相当重要
```

- [DONE!!! -- 解决“Error: Rule can only have one resource source (provided resource and test + include + exclude)”](https://blog.meathill.com/fe-tool-chain/how-to-fix-error-rule-can-only-have-one-resource-source-provided-resource-and-test-include-exclude.html)

- [DONE!!! -- 解决 build 成功之后，localhost:port 报错的问题，“TypeError: Cannot read property 'replace' of undefined”](https://www.cnblogs.com/myjyixi/p/12274244.html)

```js
//可以修改 vue.config.js 配置文件（项目由vue cli3/4创建）
module.exports = {
  css: {
    extract: true,
    sourceMap: true, //加上这个是关键！！！
  },
}
```

- [DONE!!!]在 window 系统里面，package.json 里面的自定义脚本是这样的`move dist\\vue-ssr-server-bundle.json`;而在 Mac 系统里面却又是这样的`mv dist/vue-ssr-server-bundle.json`

```shell
"scripts": {
  "build:yundee": "npm run build:ssr && move dist\\vue-ssr-server-bundle.json bundle && npm run build:client && move bundle dist\\vue-ssr-server-bundle.json && cross-env WEBPACK_TARGET=node NODE_ENV=production node ./server/ssr.js"
}
```

```shell
"build:yundee": "npm run build:ssr && mv dist/vue-ssr-server-bundle.json bundle && npm run build:client && mv bundle dist/vue-ssr-server-bundle.json && cross-env WEBPACK_TARGET=node NODE_ENV=production node ./server/ssr.js",
```

- [DONE!!!]决定重新另立一个项目，main.js、congif.js 等重新配置， 调用 Api 的组件重新修改(home 组件里面的代码自己维护)

- [DONE!!!] 站点里面的几个页面才需要是 SSR 页面，那么这几个页面的跳转的时候用`<a />`标签或者`<router-link to="/ask">Ask</router-link>`等进行，这样就可以跳转到 SSR 渲染的页面。现在的疑问是：虽然我只要几个页面 SEO,那其他的页面是不是也经过 SSR 处理了呢，只是我没有通过<a>标签去跳转调用 SSR 页面而已？？？
  
server.js 里面  路径：01技术预研\00基于Vue的Web首页SSR\SSR目录\server\server.js

```js
// router.get(':splat*', handleRequest) // 用':splat*' 替代 ‘*’  这样操作貌似不行，需要下面这样显式的确定需要SSR的路由
//重要！！！ 哪些页面需要 走SSR 都在这里面定义-- 这样就能做到SSR渲染特定的页面, 爬虫也能够只爬取特定的页面
router.get('/', handleRequest)
router.get('/contact', handleRequest)
```

- [DONE!!!]调用 API 返回的异步数据，怎么和没有数据的 HTNL 静态文件绑定？**SSR 目录**这个 demo 项目中没有加上 store,需要补上！需要参考给的 DEMO 预研清楚, 看看是否需要 npm install `vuex`、`vuex-router-sync`, 这两个包需要与 vue 的版本相匹配-- 使用状态管理工具 vuex。具体操作如下：在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。

- (TODO!!!)SSR首屏加载耗时分析

- (TODO!!!)dev.ssr.js 里面的`http://localhost:8080/vue-ssr-client-manifest.json`，为什么在 http://localhost:8080/ （也就是本机） 可以获取到 vue-ssr-client-manifest.json？

- (TODO!!!)怎么设置favicon.ico图标

- (TODO!!!)预取数据时cookie穿透的问题。
在服务器端asyncData预取数据时，不会把客户端请求中的cookie带上，所以需要手动将客户端中的cookie在预取数据时加到请求头部。

- (TODO!!!)部署方案的实现：

  - 为了解决以上提到的一些问题 。我们引入了新的技术方案 。
    Docker ：容器技术 。轻量级 、 快速的 ”虚拟化“ 方案。
    Kubernetes ：容器编排方案
    使用 Docker 接入整个开发 、 生产 、 打包流程 ， 保证各运行环境一致 。
  - 使用 Kubernetes 作为容器编排方案。
