// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDAg6piObpvNvb5c5B7VcDJwKqr2kqvHZg",
  authDomain: "archalize-27081.firebaseapp.com",
  projectId: "archalize-27081",
  storageBucket: "archalize-27081.firebasestorage.app",
  messagingSenderId: "740841154720",
  appId: "1:740841154720:web:dbd61ca88a011439e241c5",
  measurementId: "G-W1F24SC3WN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Export Firestore
export const storage = getStorage(app);
