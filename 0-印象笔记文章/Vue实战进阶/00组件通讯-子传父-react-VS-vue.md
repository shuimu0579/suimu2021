###react

- 子调用父方法

###vue

- 通过$emit通讯 this.\$emit('change', { ...this.value, number: e.target.value })

```js
<template>
  <a-input-group compact>
    <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input style="width: calc(100% - 130px)" v-model="number" @change="handleNumberChange" />
  </a-input-group>
</template>

<script>
export default {
  props: {
    //定义 自定义组件 的 value属性，是一个对象
    value: {
      type: Object,
    },
  },
  watch: {
    // 子组件的值传递过来了，接下来就要监听这些值，最终 使value值得到改变
    value(val) {
      Object.assign(this, val)
    },
  },
  data() {
    const { type, number } = this.value || {}
    return {
      type: type || 'alipay',
      number: number || '',
    }
  },
  methods: {
    handleTypeChange(val) {
      this.$emit('change', { ...this.value, type: val }) //通过this.$emit()方法来将子组件的值 传递给 上层组件
    },
    handleNumberChange(e) {
      this.$emit('change', { ...this.value, number: e.target.value })
    },
  },
}
</script>

<style></style>
```
