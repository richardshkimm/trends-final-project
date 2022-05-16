// npm install firebase
import { initializeApp, getApps, getApp, FirebaseError} from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
}
from "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBTau5mXiVX0iIXRab31-dk7Vk6bT42wEg",
  authDomain: "aromap-42052.firebaseapp.com",
  projectId: "aromap-42052",
  storageBucket: "aromap-42052.appspot.com",
  messagingSenderId: "442786158561",
  appId: "1:442786158561:web:0ba1da5f1f7444619724a0"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

export { 
  app,
  db, 
  firebaseConfig,
}