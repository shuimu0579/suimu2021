# 调试Vue（下面的几个工具都挺实用的）

## VSCode 怎么chrome断点

- [在VSCode 里面调试Vue](https://github.com/Microsoft/vscode-recipes/blob/master/vuejs-cli/README.md)

> 需要准备的原料

- chrome浏览器、VSCode(和VSCode里面的 Debugger for Chrome 插件) 、VUE（vue-cli）

> 在项目根目录下新建一个vue.config.js文件

```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}
```

> 配置 launch.json 文件

- 选择 chrome的环境
- 配置 launch.json 文件

```js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*",
        "webpack:///src/*": "${webRoot}/*",
        "webpack:///*": "*",
        "webpack:///./~/*": "${webRoot}/node_modules/*"
      }
    }
  ]
}
```

> debugger

- 在.vue文件下面打一个断点
- 启动项目  npm run serve
- 选择vuejs:chrome,然后点击绿色的按钮，这样的话，调试页面就被调用起来了

## 在浏览器里面使用 vue-devtools 工具

- [vue-develop 调试工具](https://github.com/vuejs/vue-devtools)

- 能够看到完整的结构树Tree, 和组件相应的状态

- 下载并安装chrome插件vue-devtools（可能需要科学上网）
