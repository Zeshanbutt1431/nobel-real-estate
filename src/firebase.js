import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCXEaEZXuEfQNSs4REkJ0O_XUhkH8QeXR0",
  authDomain: "nobel-real-estate.firebaseapp.com",
  projectId: "nobel-real-estate",
  storageBucket: "nobel-real-estate.appspot.com",
  messagingSenderId: "1038875262061",
  appId: "1:1038875262061:web:bd093b7d3584ac81d59364"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();