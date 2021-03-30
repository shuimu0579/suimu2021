<template>
  <div id="app">
    <router-view />
    <div style="display:flex; justify-content:center">
      <router-link to="/supplychain">数字供应链</router-link>
      <router-link to="/test">Test</router-link>
      <router-link to="/testId">TestId</router-link>
    </div>
    <Empty></Empty>
  </div>
</template>

<style>
@import '../../assets/css/public.css';
@import '../../assets/images/icon/iconfont.css';
</style>

<script>
import Empty from '../../components/Empty/Empty'

export default {
  components: { Empty },
}
</script>
