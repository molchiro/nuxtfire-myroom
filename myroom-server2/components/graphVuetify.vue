<template lang="pug">
  div
    v-sparkline(
      :value="value"
      :labels="labels"
      line-width="0.4"
      padding="16"
    )
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    labels: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
  },
}
</script>
