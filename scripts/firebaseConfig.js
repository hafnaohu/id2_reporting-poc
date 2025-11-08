// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAzlMeqGCNQUOYGUDoeMNPTMCkfAi6MK4I",

  authDomain: "id-2-cb461.firebaseapp.com",

  databaseURL: "https://id-2-cb461-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "id-2-cb461",

  storageBucket: "id-2-cb461.firebasestorage.app",

  messagingSenderId: "834320512091",

  appId: "1:834320512091:web:2eec103d0158c69931bb7e",

  measurementId: "G-K0M91MQRP3"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
