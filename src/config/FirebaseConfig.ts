// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5ntqEZWNgjbZRmlwa41uujGv6zV3m5eY",
  authDomain: "trialpulse-22015.firebaseapp.com",
  databaseURL: "https://trialpulse-22015-default-rtdb.firebaseio.com",
  projectId: "trialpulse-22015",
  storageBucket: "trialpulse-22015.appspot.com",
  messagingSenderId: "483603346235",
  appId: "1:483603346235:web:1d1464af129f2d3b29fd1e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
