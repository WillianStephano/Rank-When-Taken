import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKUhLbOVd-MJDe3zjpgCI7NDNuiyPqxus",
  authDomain: "whentaken-a3048.firebaseapp.com",
  projectId: "whentaken-a3048",
  storageBucket: "whentaken-a3048.firebasestorage.app",
  messagingSenderId: "229545851851",
  appId: "1:229545851851:web:d5469a671374af8c91944e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
