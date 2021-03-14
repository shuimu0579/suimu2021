<template>
  <div>
    <div>{{ title }}</div>
    <ContactTips />
  </div>
</template>
<script>
const ContactTips = () => import('../components/ContactTips/ContactTips.vue') //这里动态导入来做代码分割，从而达到按需加载
export default {
  components: {
    ContactTips,
  },
  data() {
    return {
      title: 'Please contact us',
    }
  },
}
</script>

<style scoped></style>
