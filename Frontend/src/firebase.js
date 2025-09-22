import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBL-N3hNe4MAfgXFhB7kSPdN_08bO-0H3o",
  authDomain: "elevatr-ad340.firebaseapp.com",
  projectId: "elevatr-ad340",
  storageBucket: "elevatr-ad340.firebasestorage.app",
  messagingSenderId: "183482711018",
  appId: "1:183482711018:web:bb972454d6ade315749093",
  measurementId: "G-305J6YXGC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

/**
 * Helper function to get photo URL or generate a default
 * For Email/Password users, will show initials as a placeholder image
 */
export const getUserPhotoOrInitials = (user) => {
  if (user.photoURL) return user.photoURL;

  const nameInitial = user.displayName ? user.displayName[0].toUpperCase() : "U";
  return `https://via.placeholder.com/150/01497C/ffffff?text=${nameInitial}`;
};

// Listener for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User is signed in.");
    console.log("User photo URL:", getUserPhotoOrInitials(user));

    user.getIdToken().then((token) => {
      console.log("✅ Firebase ID Token:", token);
    });

  } else {
    console.log("⚠️ User is signed out.");
  }
});
