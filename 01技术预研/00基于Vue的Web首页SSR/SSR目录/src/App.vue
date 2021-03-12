<template>
  <div id="app">
    <router-view />
    <Empty></Empty>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>

<script>
import Empty from './components/Empty/Empty'

export default {
  components: { Empty },
}
</script>
