// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT1NCfWA8Y-z98JPjebyS2hAQ-nj3b5W4",
  authDomain: "bossyapp-54cf2.firebaseapp.com",
  projectId: "bossyapp-54cf2",
  storageBucket: "bossyapp-54cf2.appspot.com",
  messagingSenderId: "278105150759",
  appId: "1:278105150759:web:76ffac3e442b0f5f634502"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
