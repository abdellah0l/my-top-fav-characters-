// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBys-2wVTuCxBh8JxTzoicsctql6vKGoaQ",
  authDomain: "top10favcharacters.firebaseapp.com",
  projectId: "top10favcharacters",
  storageBucket: "top10favcharacters.firebasestorage.app",
  messagingSenderId: "535831043678",
  appId: "1:535831043678:web:23300f6b6459846bfe1ecf",
  measurementId: "G-9Y7JRD6ZMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);