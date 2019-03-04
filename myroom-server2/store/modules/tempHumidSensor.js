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
    addData(state, sensorData) {
      state.tempHumidSensor.push(sensorData)
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
              commit('addData', { ...data, id })
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
