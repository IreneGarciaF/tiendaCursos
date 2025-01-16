import React from "react";
import "../styles/Cancel.css";

function Cancel() {
  return (
    <div className="cancel-container">
      <h1>Pago cancelado</h1>
      <p>No se realizó ningún cargo. Si tienes dudas, por favor contáctanos.</p>
      <a href="/cursos" className="button">Volver a Cursos</a>
    </div>
  );
}

export default Cancel;
