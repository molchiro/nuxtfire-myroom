<template>
  <div>
    <line-chart v-if="showLine" :data="chartData" :options="options"/>
  </div>
</template>

<script>
  import firebase from 'firebase'

  const ParseSensorData2ChartData = function (sensorData) {
    const x = []
    const y = []
    for (let key in sensorData) {
      // HACK:時系列で入ってくる確証はない？ちゃんと降順ソートすべき
      x.unshift(sensorData[key]["timestamp"]);
      y.unshift(sensorData[key]["tmp"])
    }
    const chartData = {
      labels: x,
      datasets: [
        {
          label: 'temperature',
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: y,
        }
      ]
    };
    return chartData;
  }

  export default {
    data () {
      return {
        showLine: false,
        chartData: {},
        options: {}
      };
    },
    mounted () {
      this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.

      const config = require("../assets/config.json");
      firebase.initializeApp(config);
      const db = firebase.database();
      const ref = db.ref("temp-humid-sensor").limitToLast(100);
      ref.on('value', ( snapshot ) => {
        this.chartData = ParseSensorData2ChartData(snapshot.val());
        console.log(this.chartData)
      })
    }
  }

</script>

<style>

</style>
