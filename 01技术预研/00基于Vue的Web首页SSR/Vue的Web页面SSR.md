# SSR 服务端渲染

- [彻底理解服务端渲染 - SSR原理](https://github.com/yacan8/blog/issues/30) 这里有创建store实例的mock数据， 我们mock一个远程服务函数fetchItem，用于查询对应item。
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

## 问题分析

- 站点里面的几个页面才需要是SSR页面，那么这几个页面的跳转的时候用`<a />`标签或者`<router-link to="/ask">Ask</router-link>`等进行，这样就可以跳转到SSR渲染的页面。现在的疑问是：虽然我只要几个页面SEO,那其他的页面是不是也经过SSR处理了呢，只是我没有通过<a>标签去跳转调用SSR页面而已？？？

- (TODO!!!)调用 API 返回的异步数据，怎么和没有数据的 HTNL 静态文件绑定？**SSR 目录**这个 demo 项目中没有加上 store,需要补上！需要参考给的 DEMO 预研清楚, 看看是否需要 npm install `vuex`、`vuex-router-sync`, 这两个包需要与 vue 的版本相匹配-- 使用状态管理工具 vuex。具体操作如下：在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。

- (TODO!!!)dev.ssr.js 里面的`http://localhost:8080/vue-ssr-client-manifest.json`，为什么在 http://localhost:8080/ （也就是本机） 可以获取到 vue-ssr-client-manifest.json？

- (TODO!!!)dataPromise 在组件中怎么使用？参考那个 demo

- (TODO!!!)head 标签里面的 meta 标签，其中的 keywords 和 description 怎么动态设置，以利于 SEO？  可以参考 [Vue2 SSR渲染, 如何根据不同页面修改 meta?](https://www.mmxiaowu.com/article/585005b24b8f0c283f7ce0d1)  或者 [https://www.digitalocean.com/community/tutorials/vuejs-vue-seo-tips](https://www.digitalocean.com/community/tutorials/vuejs-vue-seo-tips)

- [DONE!!! -- 解决“Error: Rule can only have one resource source (provided resource and test + include + exclude)”](https://blog.meathill.com/fe-tool-chain/how-to-fix-error-rule-can-only-have-one-resource-source-provided-resource-and-test-include-exclude.html)

- [DONE!!! -- 解决 build成功之后，localhost:port 报错的问题，“TypeError: Cannot read property 'replace' of undefined”](https://www.cnblogs.com/myjyixi/p/12274244.html)

```js
//可以修改 vue.config.js 配置文件（项目由vue cli3/4创建）
module.exports = {
  css: {
    extract: true, 
    sourceMap: true  //加上这个是关键！！！
  }
};

```

- [DONE!!! -- 解决 build成功之后，localhost:port  发现控制台有报错，加载不到客户端构建css和js，报404  的问题 ](https://blog.csdn.net/qq_43624878/article/details/107739956)

```js
// koa-mount可以和koa-static结合，以实现和express一样的静态服务请求前缀的功能  
// 路径：01技术预研\00基于Vue的Web首页SSR\SSR目录\server\ssr.js
app.use(koaMount('/', koaStatic(resolve('../dist')))) 
```

- [DONE!!!]在window系统里面，package.json里面的自定义脚本是这样的`move dist\\vue-ssr-server-bundle.json`;而在Mac系统里面却又是这样的`mv dist/vue-ssr-server-bundle.json`

```shell
"scripts": {
  "build:yundee": "npm run build:ssr && move dist\\vue-ssr-server-bundle.json bundle && npm run build:client && move bundle dist\\vue-ssr-server-bundle.json && cross-env WEBPACK_TARGET=node NODE_ENV=production node ./server/ssr.js"
}
```

```shell
"build:yundee": "npm run build:ssr && mv dist/vue-ssr-server-bundle.json bundle && npm run build:client && mv bundle dist/vue-ssr-server-bundle.json && cross-env WEBPACK_TARGET=node NODE_ENV=production node ./server/ssr.js",
```

- [DONE!!!]决定重新另立一个项目，main.js、congif.js等重新配置， 调用Api的组件重新修改(home组件里面的代码自己维护)
