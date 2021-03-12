<template>
  <div class="footer">我是Footer</div>
</template>

<script>
// ssr 中如果app首页只有router路由 则报错
export default {
  name: 'Header',
}
</script>

<style scoped>
.footer {
  font-size: 28px;
  color: green;
}
</style>
