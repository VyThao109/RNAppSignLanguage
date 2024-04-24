import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAXXdTIVQ9RnGEFUL-KW2m4b7MlJ-iCwaM",
  authDomain: "signapp-f1a3d.firebaseapp.com",
  databaseURL: "https://signapp-f1a3d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "signapp-f1a3d",
  storageBucket: "signapp-f1a3d.appspot.com",
  messagingSenderId: "1064403458321",
  appId: "1:1064403458321:web:903e3a847993e41ce154b0",
  measurementId: "G-M14Y5FGYL7"
};
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const db = app.firestore();
const storage = app.storage();
const firebaseDatabase = app.database();
const auth = app.auth();

export { db, storage, auth, firebaseDatabase, firebase };