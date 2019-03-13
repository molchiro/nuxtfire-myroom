import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const sensorsRef = db.collection('temp-humid-sensor')

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      tempHumidSensor: [],
    }
  },
  mutations: {
    initialize(state) {
      state.tempHumidSensor = []
    },
    pushAndLimit(state, sensorData) {
      state.tempHumidSensor.push(sensorData)
      if (state.tempHumidSensor.length > 289) {
        state.tempHumidSensor.splice(0, state.tempHumidSensor.length - 289)
      }
    },
  },
  actions: {
    startListener({ commit }) {
      commit('initialize')
      this.unsubscribe = sensorsRef
        .orderBy('timestamp', 'desc')
        .limit(289)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const data = change.doc.data()
              const id = change.doc.id
              commit('pushAndLimit', { ...data, id })
            }
          })
        })
    },
    stopListener({ commit }) {
      this.unsubscribe()
      commit('initialize')
    },
  },
}
