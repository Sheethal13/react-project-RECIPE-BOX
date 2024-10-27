import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCIKzd4pGhReQo4E_nrKxx-wHHigqdLkug",
  authDomain: "recipe-box-8b1c9.firebaseapp.com",
  databaseURL: "https://recipe-box-8b1c9-default-rtdb.firebaseio.com",
  projectId: "recipe-box-8b1c9",
  storageBucket: "recipe-box-8b1c9.appspot.com",
  messagingSenderId: "955836329675",
  appId: "1:955836329675:web:74a206d7527aedc00ef54e",
  measurementId: "G-S3JBX976QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to write login data
export function writeLoginData(userId, email) {
  set(ref(database, 'userLogin/' + userId), {
    email: email,
    loginTime: Date.now()
  })
  .then(() => {
    console.log("User data stored successfully.");
  })
  .catch((error) => {
    console.error("Error storing user data:", error);
  });
}

export function writeUserData(userId, email, username) {
  set(ref(database, 'users/' + userId), {
    email: email,
    username:username,
    loginTime: Date.now()
  })
  .then(() => {
    console.log("User data stored successfully.");
  })
  .catch((error) => {
    console.error("Error storing user data:", error);
    throw error;
  });
}

// Export Auth functions
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
