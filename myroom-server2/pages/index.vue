<template lang="pug">
  div
   h1 室温グラフ
   v-sparkline(
      :value="tmps"
      :labels="timestamps"
      line-width="1"
      label-size="1"
    )
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('tempHumidSensor', ['tempHumidSensor']),
    tmps() {
      return this.tempHumidSensor.map(x => x.tmp)
    },
    hmds() {
      return this.tempHumidSensor.map(x => x.hmd)
    },
    timestamps() {
      return this.tempHumidSensor.map(x => x.timestamp)
    },
  },
  mounted() {
    this.$store.dispatch('tempHumidSensor/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('tempHumidSensor/stopListener')
  },
}
</script>
