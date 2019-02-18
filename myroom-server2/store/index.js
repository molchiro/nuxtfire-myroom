import Vuex from 'vuex'
import tempHumidSensor from './modules/tempHumidSensnor'

const store = () =>
  new Vuex.Store({
    modules: {
      tempHumidSensor,
    },
  })

export default store
