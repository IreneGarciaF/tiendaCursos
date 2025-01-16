import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Cursos from "./pages/Cursos";
import Comunidad from "./pages/Comunidad";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import MisCursos from "./pages/MisCursos";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import CursoReact from "./pages/cursos/CursoReact";
import CursoJava from "./pages/cursos/CursoJava";
import CursoDiseño from "./pages/cursos/CursoDiseño";
import { auth, doc, setDoc, firestore } from "../firebaseConfig"; // Asegúrate de tener firestore importado

// Función para sincronizar el usuario en Firestore
const syncUserToDatabase = async (user) => {
  if (!user) return;

  try {
    const userRef = doc(firestore, "usuarios", user.uid);
    await setDoc(userRef, {
      email: user.email,
      created_at: new Date().toISOString(),
      userId: user.uid,
    });

    console.log("Usuario sincronizado con Firestore.");
  } catch (error) {
    console.error("Error al sincronizar usuario con Firestore:", error.message);
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [cursoId, setCursoId] = useState(null);  // Estado para cursoId

  // Hook de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
        setUser(user);  // Actualizar el estado de user
        await syncUserToDatabase(user);
      } else {
        console.log("No hay usuario autenticado.");
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Hook para obtener datos de la compra desde Firestore
  useEffect(() => {
    const fetchCompraData = async () => {
      if (!user || !cursoId) return;  // Asegúrate de que user y cursoId estén definidos

      try {
        // Ahora utilizamos user.uid para obtener el userId
        const docRef = firestore.collection("compras")
          .where('userId', '==', user.uid)  // Usamos user.uid
          .where('cursoId', '==', cursoId);  // Utilizamos cursoId del estado

        const querySnapshot = await docRef.get();
        querySnapshot.forEach((doc) => {
          console.log("Compra encontrada en Firestore:", doc.data());
          // Puedes agregar lógica para mostrar la información en la UI si lo necesitas
        });
      } catch (error) {
        console.error("Error al recuperar los datos de la compra:", error);
      }
    };

    fetchCompraData();
  }, [user, cursoId]);  // Ejecuta cuando el usuario o cursoId cambian

  return (
    <Router>
      <div className="page-container">
        <Header user={user} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/mis-cursos" element={<MisCursos />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/cursoReact" element={<CursoReact />} />
            <Route path="/cursoJava" element={<CursoJava />} />
            <Route path="/cursoDiseño" element={<CursoDiseño />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
