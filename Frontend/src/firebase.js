// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-bookbuy.firebaseapp.com",
  projectId: "mern-bookbuy",
  storageBucket: "mern-bookbuy.appspot.com",
  messagingSenderId: "673126242463",
  appId: "1:673126242463:web:154348e8f211f925c16aaa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);