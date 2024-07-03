import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpM09tfugWq_cAYe7434rgtubuETO46nE",
  authDomain: "fnote-4afff.firebaseapp.com",
  projectId: "fnote-4afff",
  storageBucket: "fnote-4afff.appspot.com",
  messagingSenderId: "25637641146",
  appId: "1:25637641146:web:c75583f9b939a2b2a05b83"
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default defineNuxtPlugin(nuxtApp => { 
})
