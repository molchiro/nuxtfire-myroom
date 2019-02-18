import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDc_DogP69goBEH-cSyBsp95WNV9ylnzAA",
    authDomain: "myroom-8924e.firebaseapp.com",
    databaseURL: "https://myroom-8924e.firebaseio.com",
    projectId: "myroom-8924e",
    storageBucket: "myroom-8924e.appspot.com",
    messagingSenderId: "680248693222"
  })
}

export default firebase
