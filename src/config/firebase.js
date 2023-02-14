import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCJMr0yfjCDphXSTJqomnnU9m48z2MZpXw",
    authDomain: "file-management-app-c25f6.firebaseapp.com",
    projectId: "file-management-app-c25f6",
    storageBucket: "file-management-app-c25f6.appspot.com",
    messagingSenderId: "604293020361",
    appId: "1:604293020361:web:30ef41056c82ad51552b18"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;