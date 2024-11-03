// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBimbxHJZA9WB-a8SEDs4rFOBCk7xbF6IA",
  authDomain: "dejac-458f4.firebaseapp.com",
  projectId: "dejac-458f4",
  storageBucket: "dejac-458f4.firebasestorage.app",
  messagingSenderId: "849067248352",
  appId: "1:849067248352:web:7627edc2f411f78cba9e85",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
