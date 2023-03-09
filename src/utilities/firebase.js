// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQkkBgUUeZc0cYwF7S1gLty3Ug1Iz2wqs",
  authDomain: "quiz-app-eefd7.firebaseapp.com",
  projectId: "quiz-app-eefd7",
  storageBucket: "quiz-app-eefd7.appspot.com",
  messagingSenderId: "43840398031",
  appId: "1:43840398031:web:a1f72a6dc0f0c488f3cdba",
  measurementId: "G-M6Z9FE5KCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
getAnalytics(app);

export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
