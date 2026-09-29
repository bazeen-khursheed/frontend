import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDawIGKkTeUlV-C01FMVthhfErdvZ7WVP0",
  authDomain: "e-commerce-a8c59.firebaseapp.com",
  projectId: "e-commerce-a8c59",
  storageBucket: "e-commerce-a8c59.firebasestorage.app",
  messagingSenderId: "771602715644",
  appId: "1:771602715644:web:3f926f5e69ac10dc17d879",
  measurementId: "G-L1G6JYCGC4"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);