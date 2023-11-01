// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxF44PbNEuolS6yif3S9Ldqj7zZgQAiv8",
  authDomain: "styleshare-9fc09.firebaseapp.com",
  projectId: "styleshare-9fc09",
  storageBucket: "styleshare-9fc09.appspot.com",
  messagingSenderId: "469379956462",
  appId: "1:469379956462:web:be8be8d5ac254023cfbdff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
