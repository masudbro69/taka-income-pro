import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore, doc, getDoc, updateDoc, collection, addDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      document.getElementById("coinCount").innerText = docSnap.data().coins || 0;
    }
  } else {
    window.location.href = "login.html";
  }
});

async function requestWithdraw() {
  const method = document.getElementById("method").value.trim();
  const number = document.getElementById("number").value.trim();
  const statusEl = document.getElementById("status");

  if (!method || !number) {
    statusEl.innerText = "সব তথ্য দিন।";
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);
  const coins = userSnap.data().coins || 0;

  if (coins < 100) {
    statusEl.innerText = "কমপক্ষে ১০০ কয়েন লাগবে!";
    return;
  }

  await addDoc(collection(db, "withdrawRequests"), {
    uid: currentUser.uid,
    method,
    number,
    status: "pending",
    time: Date.now()
  });

  await updateDoc(userRef, {
    coins: coins - 100
  });

  statusEl.innerText = "রিকোয়েস্ট পাঠানো হয়েছে!";
  document.getElementById("coinCount").innerText = coins - 100;
}
