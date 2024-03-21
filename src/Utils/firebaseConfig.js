// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEqcluaqD-1B7Pug9CbeiN59142YQf5i8",
  authDomain: "crimson-cup-attendance.firebaseapp.com",
  databaseURL: "https://crimson-cup-attendance-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crimson-cup-attendance",
  storageBucket: "crimson-cup-attendance.appspot.com",
  messagingSenderId: "458635286242",
  appId: "1:458635286242:web:8a702bd973166f40b430bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(app);

export const realtime_db = getDatabase(app);

export const auth = getAuth(app);