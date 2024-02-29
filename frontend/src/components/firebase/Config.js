// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5OLCEmR0IycaQjumVD0sikOLYlcSZrZw",
  authDomain: "react-use-315df.firebaseapp.com",
  projectId: "react-use-315df",
  storageBucket: "react-use-315df.appspot.com",
  messagingSenderId: "189230712885",
  appId: "1:189230712885:web:02074c977c46d1c155497c",
  measurementId: "G-VRRX24KKQS"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);