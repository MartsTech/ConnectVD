import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA47K0JQ8sdWORcsGO4jAas5Rjo0wd4q1I",
  authDomain: "connectvd-fbe6a.firebaseapp.com",
  projectId: "connectvd-fbe6a",
  storageBucket: "connectvd-fbe6a.appspot.com",
  messagingSenderId: "329080934215",
  appId: "1:329080934215:web:c1ac06fae8f7d00e6dc662",
  measurementId: "G-NZLNGSQS4R",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
