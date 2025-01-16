// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Configuración de Firebase (obtén estos datos de la consola de Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCOO5ByLlu309iLMwpcpLTefvQyOUtVtTA",
  authDomain: "tienda-digital-devshop.firebaseapp.com",
  projectId: "tienda-digital-devshop",
  storageBucket: "tienda-digital-devshop.firebasestorage.app",
  messagingSenderId: "175096632623",
  appId: "1:175096632623:web:714d678626b33f0bcebdda"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Exportar lo necesario
export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, updateProfile, getDoc  };
