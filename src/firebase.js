import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTkJnHyb_Miy39Lzpvqj1bIngkECQpjZU",
  authDomain: "mdms-dd2d6.firebaseapp.com",
  projectId: "mdms-dd2d6",
  storageBucket: "mdms-dd2d6.firebasestorage.app",
  messagingSenderId: "965669144450",
  appId: "1:965669144450:web:a1d79d98483cf59365319b",
  measurementId: "G-HZFCCX2C25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
