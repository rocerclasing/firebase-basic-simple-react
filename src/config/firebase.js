import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

//variables globales
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// 3 funcionalidades login register logout
// signInWithEmailAndPassword se importa en firebase
export const login = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);
// createUserWithEmailAndPassword se importa enfirebase
export const register = ({ email, password }) =>
  createUserWithEmailAndPassword(auth, email, password);
//logOut se importa en firebase
export const logOut = () => signOut(auth);
