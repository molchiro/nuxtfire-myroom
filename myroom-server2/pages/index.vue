<template lang="pug">
  div
   h1 室温グラフ
   graphVuetify(
      :value="tmps"
      :labels="timestamps"
    )
</template>

<script>
import { mapState } from 'vuex'
import format from 'date-fns/format'
import graphVuetify from '@/components/graphVuetify'

export default {
  components: {
    graphVuetify,
  },
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
        (el, index) =>
          index % 36 == 0 ? this.formatTimestamp(el.timestamp.toDate()) : ' '
      )
    },
  },
  mounted() {
    this.$store.dispatch('tempHumidSensor/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('tempHumidSensor/stopListener')
  },
  methods: {
    formatTimestamp(timestamp) {
      return format(timestamp, 'HH:mm')
    },
  },
}
</script>
