import "../styles/Cursos.css";
import cursos from "../data/cursos"; // Traemos los cursos estáticos
import { auth } from "../../firebaseConfig"; // Firebase para autenticación
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import Swal from "sweetalert2";

// Cargar Stripe
const stripePromise = loadStripe('pk_test_51QhRhZG8GAsKGTLjHbcg743vpDM2f1SNxkgKA9PmivfbIx2yvK9CRhBAAwqJ0jROFw24KOyaxPXejvdRqEVCpdA700kxQ0w2zK'); 

function Cursos() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);

  // Función para manejar el checkout
  const handleCheckout = async (priceId, name) => {
    if (!userId) {
      console.error('Usuario no autenticado');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor inicia sesión para continuar con la compra.',
      });
      return;
    }
  
    if (!priceId || priceId.trim() === "") {
      console.error('priceId es requerido');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El ID del precio es requerido para continuar.',
      });
      return;
    }
  
    if (!name || name.trim() === "") {
      console.error('name es requerido');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del curso es requerido para continuar.',
      });
      return;
    }
  
    try {
      // Enviar la solicitud al backend para crear la sesión de Stripe
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          priceId,
          name,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la sesión de pago');
      }
  
      const session = await response.json(); // Asegúrate de obtener sessionId
  
      // Verificar que sessionId esté presente
      if (!session.sessionId) {
        throw new Error('No se recibió sessionId');
      }
  
      // Redirigir al usuario a Stripe Checkout con sessionId
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId, // Asegúrate de pasar el sessionId aquí
      });
  
      if (error) {
        console.error('Error al redirigir al checkout:', error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud al backend:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al procesar tu solicitud, por favor intenta nuevamente.',
      });
    }
  };


  return (
    // El JSX de tu componente Cursos.jsx
<div className="cursos-container">
  <div className="cursos-grid">
    {cursos.map((curso) => (
      <div
        key={curso.id}
        className="curso-card"
        style={{
          backgroundImage: `url(${curso.imagen})`,
        }}
      >
        <h2>{curso.titulo}</h2>
        <p>{curso.descripcion}</p>
        <p className="precio">{curso.precio}</p>
        <button
          className="comprar-btn"
          onClick={() => handleCheckout(curso.priceId, curso.titulo)}
        >
          Comprar
        </button>
      </div>
    ))}
  </div>
</div>
  );
}

Cursos.propTypes = {
  cursoId: PropTypes.string.isRequired,
  nombreCurso: PropTypes.string.isRequired,
  precioCurso: PropTypes.string.isRequired,
};

export default Cursos;
