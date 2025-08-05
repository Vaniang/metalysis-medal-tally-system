import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCflNGQb3U0Dz4Gpe1fgm91PmMIbtz-Hk",
  authDomain: "metalysis-6e7ad.firebaseapp.com",
  projectId: "metalysis-6e7ad",
  storageBucket: "metalysis-6e7ad.firebasestorage.app",
  messagingSenderId: "442064347480",
  appId: "1:442064347480:web:05eef3b93386fee2e6c52d"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
