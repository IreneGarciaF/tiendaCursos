import React, { useState, useEffect, useRef } from "react";
import { auth, firestore, doc, setDoc, updateProfile } from "../../firebaseConfig"; // Asegúrate de que estas funciones estén correctamente importadas
import { getDoc } from "firebase/firestore"; // Importamos getDoc para poder verificar los documentos en Firestore
import "../styles/Registro.css";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Registro() {
  const userInputRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValidMatch(pwd === matchPwd); // Comprobar si las contraseñas coinciden
  }, [pwd, matchPwd]);

  // Foco en el campo de nombre cuando el componente se monta
  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !pwd || !validMatch) {
      alert("Por favor, completa todos los campos correctamente.");
      setLoading(false);
      return;
    }

    try {
      // Crear el usuario con el email y la contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      const user = userCredential.user;

      console.log("Usuario autenticado:", user);
      console.log("Registrando usuario con los siguientes datos:", {
        email: user.email,
        nombre: name,
        created_at: new Date().toISOString(),
        userId: user.uid
      });

      // **Actualizar displayName en Firebase Auth**
      await updateProfile(user, { displayName: name });
      console.log("displayName actualizado en Firebase Auth.");

      // Guardar el resto de los datos en Firestore
      const userDocRef = doc(firestore, "usuarios", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        nombre: name,
        created_at: new Date().toISOString(),
        userId: user.uid
      });

      // Mostrar una alerta de éxito
      alert("USUARIO REGISTRADO CON EXITO");

      // Limpiar los campos
      setName("");
      setEmail("");
      setPwd("");
      setMatchPwd("");

      // Redirigir al login
      window.location.href = "/login"; // Redirige al login
    } catch (err) {
      console.error("Error al registrar el usuario:", err.message);
      alert(`Error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="registro-container">
      <h1>Regístrate</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Tu nombre"
            required
            ref={userInputRef} // Foco en el campo de nombre
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Tu email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            required
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </div>

        <div>
          <label>
            Confirmar Contraseña:
            <span className={matchPwd && validMatch ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={matchPwd && !validMatch ? "invalid" : "hide"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            placeholder="Repite tu contraseña"
            required
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </div>

        <button type="submit" disabled={!validMatch || loading}>
          {loading ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>

      <p>
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
}

export default Registro;
