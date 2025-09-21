import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFt5fHyDoQhBU5LmOWhzBItH6KBSKXkUI",
  authDomain: "emily-leme-pb.firebaseapp.com",
  projectId: "emily-leme-pb",
  storageBucket: "emily-leme-pb.firebasestorage.app",
  messagingSenderId: "1037570613286",
  appId: "1:1037570613286:web:23d231d325b7626a0486e7",
  measurementId: "G-FP7547VE72",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
