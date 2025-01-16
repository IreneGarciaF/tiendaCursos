import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";  // Importa auth desde firebaseConfig
import "../styles/Header.css";

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();  // Usamos el método de logout de la versión frontend de Firebase
      navigate("/login"); // Redirigir a login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h1>DEVSHOP</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          {user && (
            <li>
              <Link to="/mis-cursos">Mis Cursos</Link>
            </li>
            
          )}
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
          <li>
            <Link to="/comunidad">Comunidad</Link>
          </li>
          {user ? (
            <li>
              <button className="cerrar-btn" onClick={handleLogout}>Cerrar sesión</button> {/* Botón para cerrar sesión */}
            </li>
          ) : (
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

