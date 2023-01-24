import { initializeApp } from "firebase/app";
import * as firebase from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQkkBgUUeZc0cYwF7S1gLty3Ug1Iz2wqs",
  authDomain: "quiz-app-eefd7.firebaseapp.com",
  projectId: "quiz-app-eefd7",
  storageBucket: "quiz-app-eefd7.appspot.com",
  messagingSenderId: "43840398031",
  appId: "1:43840398031:web:a1f72a6dc0f0c488f3cdba",
  measurementId: "G-M6Z9FE5KCF",
};

initializeApp(firebaseConfig);

export default firebase;
