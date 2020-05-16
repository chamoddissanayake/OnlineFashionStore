import firebase from 'firebase';

const config = {
   apiKey: "AIzaSyDVgjSTYMPk5U96WM2LJ3H60ZaJhfvaE9M",
   authDomain: "fashionstore-276105.firebaseapp.com",
   databaseURL: "https://fashionstore-276105.firebaseio.com",
   projectId: "fashionstore-276105",
   storageBucket: "fashionstore-276105.appspot.com",
   messagingSenderId: "322304903819",
   appId: "1:322304903819:web:f5e099245e805efcf0a28e",
   measurementId: "G-HSTT06MRS6"
}

firebase.initializeApp(config);

export default firebase