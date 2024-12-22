import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAn0gi4KE1Z5kkzIQikAleUFkad8nHB4XA",
  authDomain: "appmy-3b6e3.firebaseapp.com",
  projectId: "appmy-3b6e3",
  storageBucket: "appmy-3b6e3.firebasestorage.app",
  messagingSenderId: "462347961083",
  appId: "1:462347961083:web:fb4be5deb7b533c21b665e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);


