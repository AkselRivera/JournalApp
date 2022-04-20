import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey ,
    authDomain: process.env.REACT_APP_authDomain ,
    projectId: process.env.REACT_APP_projectId ,
    storageBucket: process.env.REACT_APP_storageBucket ,
    messagingSenderId: process.env.REACT_APP_messagingSenderId ,
    appId: process.env.REACT_APP_appId 
  };

  
// REACT_APP_apiKey= "AIzaSyC5x5l5tEMjjzOZ4e0PmuqluNHUmlmxIbE",
// REACT_APP_authDomain= "react-app-cursos-15d63.firebaseapp.com",
// REACT_APP_projectId= "react-app-cursos-15d63",
// REACT_APP_storageBucket= "react-app-cursos-15d63.appspot.com",
// REACT_APP_messagingSenderId= "467485146032",
// REACT_APP_appId= "1:467485146032:web:724ac5d10c15d7928c7475"


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
 const db= firebase.firestore();
 const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

 export {db, googleAuthProvider, firebase}