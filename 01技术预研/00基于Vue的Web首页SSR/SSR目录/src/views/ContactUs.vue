<template>
  <div>
    <div>{{ title }}</div>
    <ContactTips />
  </div>
</template>
<script>
const ContactTips = () => import('../components/ContactTips/ContactTips.vue')
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
