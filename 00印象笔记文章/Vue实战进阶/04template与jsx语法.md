### template 与 JSX 的比较

> template

- 学习成本低
- 大量内置指令，简化开发
- 组件作用域 scope css

> JSX

- 相比于 template ,JSX 灵活
- JSX 不是仅仅只能在 React 里面用的，它是一个独立的 模板语法糖 🍬🍬
- 由于 jsx 的灵活性，在 Vue 里面也是可以用 jsx 的，也就是说 template 和 JSX 是可以混用的。

> template 和 JSX 的本质

- template 和 JSX 都是 语法糖。最终都会编译成为 createElement()定义组件的形式。

- template 和 JSX 他们 **`殊途同归`**

template

```javascript
<template>
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</template>
<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
};
</script>
```

jsx

```javascript
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
  render: function(h) {
    const Tag = `h${this.level}`
    return <Tag>{this.$slots.default}</Tag>
  },
}
```

js

```javascript
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
  render: function(createElement) {
    return createElement(
      'h' + this.level, // 标签名称
      this.$slots.default, // 子元素数组
    )
  },
}
```
