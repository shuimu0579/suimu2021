<template>
  <div>
    <div>{{ title }}</div>
    <ContactTips />
  </div>
</template>
<script>
const ContactTips = () => import('../components/ContactTips/ContactTips.vue') //这里动态导入来做代码分割，从而达到按需加载
// <div>contactItem 是 {{ contactItem }}</div>
export default {
  components: {
    ContactTips,
  },
  data() {
    return {
      title: 'Please contact us',
    }
  },
  // asyncData({ store, route }) {
  //   // 触发 action 后，会返回 Promise
  //   console.log('route...', route)
  //   return store.dispatch('fetchItems', route.params.id)
  // },
  // computed: {
  //   // 从 store 的 state 对象中的获取 item。
  //   contactItem() {
  //     return this.$store.state.item
  //   },
  // },
}
</script>

<style scoped></style>
