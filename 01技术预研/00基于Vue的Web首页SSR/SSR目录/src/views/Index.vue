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
}
</script>

<style scoped></style>
