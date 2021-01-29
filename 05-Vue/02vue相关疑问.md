# Vue 相关疑问

## router相关

- 不同的属性，但是渲染的是同一个组件。有一个问题就是 this also means that the lifecycle hooks of the component will not be called
- [reacting-to-params-changes](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)

```js
// To react to params changes in the same component
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // react to route changes...
    }
  }
}
```

## elementUI 的样式style是在哪里查看的

- import 'element-ui/lib/theme-chalk/index.css'
