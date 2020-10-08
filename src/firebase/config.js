import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBb53K68JNS4BUgQyxSwJBP26OnL-GnEz8",
    authDomain: "fakegram-f063f.firebaseapp.com",
    databaseURL: "https://fakegram-f063f.firebaseio.com",
    projectId: "fakegram-f063f",
    storageBucket: "fakegram-f063f.appspot.com",
    messagingSenderId: "645309976418",
    appId: "1:645309976418:web:831504569c6e7370e2263b"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();


export { projectStorage, projectFirestore };


