// Import the functions you need from the SDKs you need
const {initializeApp}= require("firebase/app")
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO13QbOTXthH6DcZioJPukIMCyybvlwcQ",
  authDomain: "dstopia-db918.firebaseapp.com",
  projectId: "dstopia-db918",
  storageBucket: "dstopia-db918.appspot.com",
  messagingSenderId: "634079888128",
  appId: "1:634079888128:web:98d08eebdcf7a0533869e5"
}

// Initialize Firebase
const admin = initializeApp(firebaseConfig)

const db = getFirestore(admin)

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities')
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map(doc => doc.data())
  return cityList
}

module.exports = { admin, db }