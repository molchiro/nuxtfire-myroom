<template lang="pug">
  div
   h1 hello world!
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('tempHumidSensor/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('tempHumidSensor/stopListener')
  },
}
</script>
