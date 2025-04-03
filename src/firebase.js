// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6b-Pk5xlO3s1EzLH6EmJh4MPmsyCnhJA",
  authDomain: "math-mania-5453f.firebaseapp.com",
  projectId: "math-mania-5453f",
  storageBucket: "math-mania-5453f.firebasestorage.app",
  messagingSenderId: "353025496466",
  appId: "1:353025496466:web:dd623b7553403002145d4b",
  measurementId: "G-ERQNH1BS1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };