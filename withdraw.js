import { auth, db } from './firebase.js';
import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import {
  doc, getDoc, updateDoc, collection, addDoc
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

let userId = null;
let coins = 0;

onAuthStateChanged(auth, async (user) => {
  if (!user) return location.href = "login.html";
  userId = user.uid;

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    coins = userSnap.data().coins || 0;
    document.getElementById("coinCount").innerText = coins;
  }
});

window.requestWithdraw = async () => {
  const method = document.getElementById("method").value.trim();
  const number = document.getElementById("number").value.trim();
  const status = document.getElementById("status");

  if (!method || !number || number.length < 6) {
    status.innerText = "সঠিক তথ্য দিন।";
    return;
  }

  if (coins < 1000) {
    status.innerText = "কমপক্ষে ১০০০ কয়েন লাগবে!";
    return;
  }

  await addDoc(collection(db, "withdrawRequests"), {
    uid: userId,
    method,
    number,
    status: "pending",
    time: Date.now()
  });

  await updateDoc(doc(db, "users", userId), {
    coins: coins - 1000
  });

  status.innerText = "রিকোয়েস্ট পাঠানো হয়েছে!";
  document.getElementById("coinCount").innerText = coins - 1000;
};
