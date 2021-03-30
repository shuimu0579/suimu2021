# Vue 的 SSR 预研

- [Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)

## 服务器端渲染 vs 预渲染 (SSR vs Prerendering) vs Nuxt(基于 Vue 的 SSR 框架)

> 什么情况下使用**Prerendering**

- **!!!纯静态页面，比如静态产品页面**才能用prerender,也就是要调用API接口的页面，要动态获取数据的页面，是不能用Prerendering的

- 如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。
- 无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。
- 优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。
- 如果你使用 webpack，你可以使用 `prerender-spa-plugin` 轻松地添加预渲染。
- 参考文档： https://github.com/chrisvfritz/prerender-spa-plugin

> 什么情况下使用**Nuxt**

- 如果你倾向于使用提供了平滑开箱即用体验的更高层次解决方案,并提供了一些额外的功能，例如静态站点生成
- 但是，如果你需要更直接地控制应用程序的结构，Nuxt.js 并不适合这种使用场景

> 除此之前，使用原生的 SSR（也称 node 同构直出、同构）

- 参考文档：
- [使用 Vue 完成 SSR 的官方 DEMO](https://github.com/vuejs/vue-hackernews-2.0/)
- [Vue 服务端渲染实践 ——Web 应用首屏耗时最优化方案](https://segmentfault.com/a/1190000018577041)

## 使用SSR预研成功的标志（这三点没有都满足的话，就容易有坑）

> 参考DEMO:

- Home首页中 `各个子组件` 通过调用api数据，挂载到store 能够成功。
- 除了Home首页的渲染，其他`特定宣传页`(和Home页面同级)也要渲染成功。
- 用meta-vue做TDK动态配置，需要做到随页面的不同而不同，也就是动态配置。
