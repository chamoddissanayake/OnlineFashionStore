import firebase from 'firebase';

 const config = {
    apiKey: "AIzaSyBhjyPRlKefR51yAFcgnSBVzouW6psm2xM",
    authDomain: "image-upload-92fbc.firebaseapp.com",
    databaseURL: "https://image-upload-92fbc.firebaseio.com",
    projectId: "image-upload-92fbc",
    storageBucket: "image-upload-92fbc.appspot.com",
    messagingSenderId: "903474501920",
    appId: "1:903474501920:web:ea5a3b377f773a51401f45",
    measurementId: "G-LZLDH9RY3G"
 }

 firebase.initializeApp(config);

 export default firebase