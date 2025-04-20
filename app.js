// Firestore initialize
const db = firebase.firestore();

// Dummy user ID (change this in real version)
const userId = "demo-user";

// Get user's coin data from Firestore
function getUserCoins() {
  db.collection("users").doc(userId).get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      document.getElementById("coin-count").innerText = data.coins || 0;
    } else {
      // First time user, create document
      db.collection("users").doc(userId).set({ coins: 0 });
    }
  });
}

// Earn coin logic
function earnCoins() {
  const coinSpan = document.getElementById("coin-count");
  let currentCoins = parseInt(coinSpan.innerText);
  let newCoins = currentCoins + 1;

  db.collection("users").doc(userId).set({ coins: newCoins }, { merge: true })
    .then(() => {
      coinSpan.innerText = newCoins;
    });
}

// Load coin on page load
window.onload = getUserCoins;
