import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import "../Styles/Success.css";

function Success() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null); 
  const [courseName, setCourseName] = useState(null);
  const [error, setError] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);  // Para verificar si la compra fue exitosa

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    const priceId = urlParams.get("priceId");

    if (!sessionId || !priceId) {
      setError("No se encontraron los parámetros session_id o priceId en la URL.");
      return;
    }

    // Hacer la solicitud al backend para obtener los detalles de la compra
    const verifyPurchase = async () => {
      try {
        const response = await fetch(`http://localhost:3001/success?session_id=${sessionId}&priceId=${priceId}`);
        
        // Verifica si la respuesta es exitosa (código de estado 2xx)
        if (!response.ok) {
          const errorData = await response.json(); // Si la respuesta no es exitosa, obtiene los datos del error
          throw new Error(errorData.error || 'Error al verificar la compra');
        }
    
        const data = await response.json();
        setUserName(data.userId);  // El nombre del usuario
        setCourseName(data.productName);  // El nombre del curso
        setIsPurchased(true);
    
      } catch (error) {
        setError("Hubo un error al verificar la compra: " + error.message);
      }
    };
    
    verifyPurchase();
  }, []);  // Empty array to only run once after the component mounts

  return (
    <div>
      <Container fluid className="seccion-success">
        <Row className="compra-container">
          <h1>¡Gracias por tu compra!</h1>
          {isPurchased ? (
            <div>
              <h1>{userName}</h1> {/* Mostrar el nombre del usuario */}
              <h5>El curso que has adquirido:</h5>
              <h6>{courseName}</h6> {/* Mostrar el nombre del curso */}
              <p>Esta es solo una página para que sepas que todo ha ido estupendamente</p>
              <p>Pulsa en el botón para ir a tu página de cursos</p>
              <Link to="/mis-cursos">
                <Button variant="primary" className="success-btn">
                  Mis Cursos
                </Button>
              </Link>
            </div>
          ) : (
            <p>Esperando datos...</p>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Row>
      </Container>
    </div>
  );
}

export default Success;
