import React from "react";
import "../styles/Inicio.css";
import cursos from "../data/cursos";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>¡Transforma tu futuro con nuestros cursos!</h1>
        <p>Aprende nuevas habilidades y avanza en tu carrera desde la comodidad de tu hogar.</p>
        <button className="cta-button" onClick={() => navigate("/cursos")}>
          Explorar Cursos
        </button>
      </section>

      {/* Características */}
      <section className="features">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Expertos en el campo</h3>
            <p>Aprende de instructores altamente calificados.</p>
          </div>
          <div className="feature">
            <h3>100% Online</h3>
            <p>Accede a tus cursos en cualquier momento y lugar.</p>
          </div>
          <div className="feature">
            <h3>Certificados</h3>
            <p>Obtén certificaciones para destacar en tu carrera.</p>
          </div>
        </div>
      </section>

      {/* Ofertas destacadas */}
      <section className="courses-highlight">
        <h2>Cursos más populares</h2>
        <div className="courses-grid">
          {cursos.slice(0, 3).map((curso) => (
            <div key={curso.id} className="course">
              <h3>{curso.titulo}</h3>
              <p>{curso.descripcion}</p>
              <button onClick={() => navigate("/cursos")}>Más información</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Inicio;
