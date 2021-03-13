# SSR 服务端渲染

- [vue-cli3 搭建的 vue 改造成 SSR 项目](https://blog.csdn.net/weixin_40965293/article/details/106619172)

- [Vue.js 服务器端渲染指南](https://ssr.vuejs.org/zh/)

## SSR 目录项目分析

- `package.json`里面的 build:yundee 和 dev:yundee 分别调用的是`server目录`下的 ssr.js，而 ssr.js 又调用了 dev.ssr.js(DEV 环境下的服务端渲染)和 server.js(生产环境下的服务端渲染),**先执行 dev.ssr.js**，生成最新的 vue-ssr-server-bundle.json 和 获取最新的 vue-ssr-client-manifest.json；也就是说先执行`dev:yundee`,再执行`build:yundee`； 也就是说先执行`npm run serves yundeePlatform yundee`、再执行`npm run builds yundeePlatform yundee`。
-

## 问题分析

- [解决“Error: Rule can only have one resource source (provided resource and test + include + exclude)”](https://blog.meathill.com/fe-tool-chain/how-to-fix-error-rule-can-only-have-one-resource-source-provided-resource-and-test-include-exclude.html)
