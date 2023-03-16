// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfJTpHXiSGmPXRBFt0mg6W4m34pFumaOs",
  authDomain: "bossy-2c5bb.firebaseapp.com",
  projectId: "bossy-2c5bb",
  storageBucket: "bossy-2c5bb.appspot.com",
  messagingSenderId: "825768290360",
  appId: "1:825768290360:web:0547ce9916911e97641ecd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
