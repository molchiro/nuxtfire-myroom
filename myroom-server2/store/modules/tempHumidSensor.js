import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const roomsRef = db.collection('rooms')

export default {
  namespaced: true,
  state() {
    return {
      tempHumidSensor: [],
    }
  },
}
