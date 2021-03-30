<template>
  <div class="header">我是Header</div>
</template>

<script>
// ssr 中如果app首页只有router路由 则报错
export default {
  name: 'Header',
  props: {
    menuArrProp: {
      type: Array,
      default: function() {
        return []
      },
    },
    navArrProp: {
      type: Array,
      default: function() {
        return []
      },
    },
    curSelectProp: {
      type: String,
      default: function() {
        return '/'
      },
    },
  },
}
</script>

<style scoped>
.header {
  font-size: 28px;
  color: red;
}
</style>
