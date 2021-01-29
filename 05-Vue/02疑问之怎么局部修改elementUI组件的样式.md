# 局部修改elementUI 组件的样式

- [vue-cli —— 局部修改Element样式](https://www.cnblogs.com/FHC1994/p/10371667.html)

## 怎么找到elementUI的样式

- 根据这个目录（node_modules\element-ui\lib\theme-chalk\fonts）找到相应的css文件

## 找到了elementUI的样式之后，怎么进行override复写呢

- scoped代表局部作用域
- /deep/  或者 >>> 代表着scope的穿透
- 什么是穿透： 引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。来穿透scoped。
- 是否需要 !important， 一般穿透时加上比较好，加上就代表着最高的优先级

```css
<style scoped>
.logouttext /deep/ .el-dialog {
    margin-top: 30vh !important;
}
</style>
```
