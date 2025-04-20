// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDts5_NDqvHpgZIBX-GzNij28UHoULr8_Y",
  authDomain: "taka-income-pro.firebaseapp.com",
  projectId: "taka-income-pro",
  storageBucket: "taka-income-pro.appspot.com",
  messagingSenderId: "153366647999",
  appId: "1:153366647999:web:fb63b29c2a2a9ce93b6b03"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
