// Firebase Shortcuts
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const coinSpan = document.getElementById("coin-count");
const sound = document.getElementById("coin-sound");

// Auth State Observer
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();

    // Create user document if not exist
    if (!doc.exists) {
      await userRef.set({ coins: 0 });
    }

    // Real-time listener for coin updates
    userRef.onSnapshot((doc) => {
      const coins = doc.data().coins;
      coinSpan.innerText = coins;
      sound.play(); // play coin sound on update
    });

  } else {
    // Anonymous Sign In
    auth.signInAnonymously().catch((error) => {
      console.error("Anonymous login failed:", error);
    });
  }
});
