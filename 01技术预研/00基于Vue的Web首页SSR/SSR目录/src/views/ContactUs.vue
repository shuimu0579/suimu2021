<template>
  <div>{{ title }}</div>
  <ContactTips />
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
