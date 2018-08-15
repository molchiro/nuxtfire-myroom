<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{today.date}}の天気</p>
    <p>{{today.telop}}</p>
    <p>最高気温{{today.max}}</p>
    <p>最低気温{{today.min}}</p>
    <p>{{tommorow.date}}の天気</p>
    <p>{{tommorow.telop}}</p>
    <p>最高気温{{tommorow.max}}</p>
    <p>最低気温{{tommorow.min}}</p>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    const url = "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010";
    const { data } = await axios.get(url);

    const arrangeTemp = function(temp) {
      return temp ? temp.celsius + "℃" : "データ無し";
    }

    return {
      title: data.title,
      today: {
        date: data.forecasts[0].date,
        telop: data.forecasts[0].telop,
        max: arrangeTemp(data.forecasts[0].temperature.max),
        min: arrangeTemp(data.forecasts[0].temperature.min)
      },
      tommorow: {
        date: data.forecasts[1].date,
        telop: data.forecasts[1].telop,
        max: arrangeTemp(data.forecasts[1].temperature.max),
        min: arrangeTemp(data.forecasts[1].temperature.min)
      }
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
