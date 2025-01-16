import React, { useState } from "react";
import { auth, firestore, signInWithEmailAndPassword, doc, setDoc } from "../../firebaseConfig"; // Importa las funciones correctamente
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const syncUserToDatabase = async (user) => {
    if (!user) return;

    try {
      // Sincronizar el usuario con Firestore
      const userRef = doc(firestore, "usuarios", user.uid);
      await setDoc(userRef, {
        email: user.email,
        created_at: new Date().toISOString(),
      });

      console.log("Usuario sincronizado con Firestore.");
    } catch (error) {
      console.error("Error al sincronizar usuario con Firestore:", error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuario autenticado:", user);
      
      // Sincronizar usuario con Firestore
      await syncUserToDatabase(user);

      alert("Sesión iniciada con éxito.");
      // Redirigir al usuario a otra página, por ejemplo, /cursos
      // window.location.href = "/cursos";

    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Tu email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
      </p>
    </div>
  );
}

export default Login;
