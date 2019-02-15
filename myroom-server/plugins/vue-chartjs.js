import Vue from 'vue'
import { Line } from 'vue-chartjs'
import firebase from 'firebase'

const ParseSensorData2ChartData = function (sensorData) {
  const x = []
  const y = []
  for (let key in sensorData) {
    // HACK:時系列で入ってくる確証はない？ちゃんと降順ソートすべき
    x.push(sensorData[key]["timestamp"]);
    y.push(Number(sensorData[key]["tmp"]));
  }
  const chartData = {
    labels: x,
    datasets: [
      {
        label: 'temperature',
        data: y,
      }
    ]
  };
  return chartData;
}

Vue.component('line-chart', {
  extends: Line,
  mounted () {
    const options = {
      elements: {
        line: {
          tension: 0,
          fill: false,
        }
      },
      animation: { duration: 0 },
      hover: { animationDuration: 0 },
      responsiveAnimationDuration: 0,
      maintainAspectRatio: false
    }

    const config = require("../assets/config.json");
    firebase.initializeApp(config);
    const db = firebase.database();
    const ref = db.ref("temp-humid-sensor").limitToLast(100);

    ref.on('value', ( snapshot ) => {
      const chartData = ParseSensorData2ChartData(snapshot.val());
      this.renderChart(chartData, options);
    })
  }
});
