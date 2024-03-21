import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD8HCNmaIJn1V4nwYnmgxVT5pjDEazJg_Y",
  authDomain: "hospital-finder-app-96042.firebaseapp.com",
  projectId: "hospital-finder-app-96042",
  storageBucket: "hospital-finder-app-96042.appspot.com",
  messagingSenderId: "767784153616",
  appId: "1:767784153616:web:f1528855326cdf0ad7d095",
  measurementId: "G-N2TPBSVQRM",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase using initializeApp function
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, db}