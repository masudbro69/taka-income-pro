// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqjGx0X5sAFaD5vTrmuEkOX_aNNfHBEBo",
  authDomain: "taka-income-pro.firebaseapp.com",
  projectId: "taka-income-pro",
  storageBucket: "taka-income-pro.appspot.com",
  messagingSenderId: "94213173931",
  appId: "1:94213173931:web:8583e617f2b14d2e2e4ac0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
