# 从零搭建一个 Vue 项目，ElementUI 框架

## ElementUI 框架

- [elementUI 官方文档](https://element.eleme.cn/#/en-US/component/upload)

```js
//src\main.js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

## 公共的自定义方法和变量 common const and util

```js
//src\main.js
import globalVariable from './util/constant'
import { util } from './util/util'

Vue.prototype.$GLOBAL = globalVariable
Vue.prototype.$util = util
```
