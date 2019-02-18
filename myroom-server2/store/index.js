import Vuex from 'vuex'
import tempHumidSensor from './modules/tempHumidSensor'

const store = () =>
  new Vuex.Store({
    modules: {
      tempHumidSensor,
    },
  })

export default store
