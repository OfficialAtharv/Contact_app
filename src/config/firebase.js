// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuJXC3EgWimLHTzcJW1zNzzLUsIo3_Vcs",
  authDomain: "vite-contact-f5f72.firebaseapp.com",
  projectId: "vite-contact-f5f72",
  storageBucket: "vite-contact-f5f72.appspot.com",
  messagingSenderId: "597596760147",
  appId: "1:597596760147:web:e3b2015b87cdf5512bfea6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);