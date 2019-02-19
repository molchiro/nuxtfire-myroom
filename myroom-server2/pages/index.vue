<template lang="pug">
  div
   h1 室温グラフ
   v-sparkline(
      :value="tmps"
      :labels="timestamps"
      line-width="0.4"
      padding="16"
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
      return this.tempHumidSensor.map(
        (el, index) => (index % 144 == 0 ? el.timestamp.toDate() : ' ')
      )
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
