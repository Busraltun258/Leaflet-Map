"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-gCT9ymEC0GJWNBddhGTf9BdTWgsfjzo",
  authDomain: "leaflet-app-e5783.firebaseapp.com",
  projectId: "leaflet-app-e5783",
  storageBucket: "leaflet-app-e5783.appspot.com",
  messagingSenderId: "918258023036",
  appId: "1:918258023036:web:082f1ea00315fc361227f9",
  measurementId: "G-YTZXB2PYC7"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const db = getFirestore(app);


export { auth, db };
