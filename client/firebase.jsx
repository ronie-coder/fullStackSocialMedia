// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa2V81dnIruEfJv4nPajebp1HM89ktSOI",
  authDomain: "fullstacksocialmedia-22fc3.firebaseapp.com",
  projectId: "fullstacksocialmedia-22fc3",
  storageBucket: "fullstacksocialmedia-22fc3.appspot.com",
  messagingSenderId: "124125666967",
  appId: "1:124125666967:web:13f70ac3798a373532d3d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
