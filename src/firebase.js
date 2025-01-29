// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAExFKYKJtRLLPpyg-aHuV3LyPUdPCabtk",
  authDomain: "authwithfirebase-7431d.firebaseapp.com",
  projectId: "authwithfirebase-7431d",
  storageBucket: "authwithfirebase-7431d.firebasestorage.app",
  messagingSenderId: "187909627206",
  appId: "1:187909627206:web:16d9d67033ace78660d947",
  measurementId: "G-W7EKJL8YJC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)