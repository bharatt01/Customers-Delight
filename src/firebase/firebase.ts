import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB1CYt3xxSArcXkv7l04t0e1TvOJoWeUc8",
  authDomain: "customerdelight-b8134.firebaseapp.com",
  projectId: "customerdelight-b8134",
  storageBucket: "customerdelight-b8134.firebasestorage.app",
  messagingSenderId: "534009887062",
  appId: "1:534009887062:web:643fa16802081df1a07ef7",
  measurementId: "G-JXCF4N2761"
};

console.log("🔥 Initializing Firebase with config:", {
  ...firebaseConfig,
  apiKey: "***hidden***"
});

const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase app name:", app.name);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("🔥 Firestore db initialized:", db);
