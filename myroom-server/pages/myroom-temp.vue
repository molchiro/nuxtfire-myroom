<template>
  <section class="container">
    <li v-for="item in sensorData" v-bind:key="item.timestamp">
      {{ item.timestamp }} 室温{{ item.tmp}}℃ 湿度{{ item.hmd }}%
    </li>
  </section>
</template>

<script>
  import firebase from 'firebase'

  const sensorDataParser = function (sensorData) {
    const result = [];
    for (let key in sensorData) {
      // HACK:時系列で入ってくる確証はない？ちゃんと降順ソートすべき
      result.unshift(sensorData[key])
    }
    return result;
  }

  export default {
    data () {
      return {
        sensorData: []
      };
    },
    mounted () {
      const config = require("../assets/config.json");
      firebase.initializeApp(config);
      const db = firebase.database();
      const ref = db.ref("temp-humid-sensor").limitToLast(100);
      ref.on('value', ( snapshot ) => {
        this.sensorData = sensorDataParser(snapshot.val());
      })
    }
  }

</script>

<style>

</style>
