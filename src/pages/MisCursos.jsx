import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import imagenCursoReact from "../assets/1_odW0CyTVxMVt5s3yhjjOhw.png";
import imagenCursoJavaScript from "../assets/gabriel-heinzer-g5jpH62pwes-unsplash-scaled.jpg";
import imagenCursoUXUI from "../assets/c00bce58c817ec3a16945711111641d37320ae67-2240x1260.webp";
import "../styles/MisCursos.css";

// Asociamos priceId con las imágenes aquí, dentro del archivo
const imagenesCursos = {
  "price_1QhRigG8GAsKGTLjWzZGP9hC": imagenCursoReact,
  "price_1QhRjbG8GAsKGTLj8C1V8Pma": imagenCursoJavaScript,
  "price_1QhRk2G8GAsKGTLjH23B3RpG": imagenCursoUXUI
};

function MisCursos() {
  const [cursosComprados, setCursosComprados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // Hook para navegación

  // Verifica el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch de cursos cuando el usuario está autenticado
  useEffect(() => {
    if (!user) {
      setCursosComprados([]);
      setLoading(false);
      return;
    }

    const fetchCursos = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const response = await fetch(`http://localhost:3001/get-compras/${user.uid}`);
        if (!response.ok) {
          throw new Error("No se encontraron compras o hubo un error en el servidor");
        }
        const compras = await response.json();
    
        console.log('Compras recibidas:', compras);  // Verifica los datos recibidos
    
        if (compras.length === 0) {
          setCursosComprados([]);
        } else {
          setCursosComprados(compras);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los cursos comprados:", err.message);
        setError("Hubo un error al cargar los cursos.");
        setLoading(false);
      }
    };
    
    fetchCursos();
  }, [user]);

  const handleIrAlCurso = (priceId) => {
    // Redirigir según el priceId
    if (priceId === "price_1QhRigG8GAsKGTLjWzZGP9hC") {
      navigate("/cursoReact");
    } else if (priceId === "price_1QhRjbG8GAsKGTLj8C1V8Pma") {
      navigate("/cursoJava");
    } else if (priceId === "price_1QhRk2G8GAsKGTLjH23B3RpG") {
      navigate("/cursoDiseno");
    }
  };

  return (
    <div className="mis-cursos-container">
      <h1>Mis Cursos</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {cursosComprados.length > 0 ? (
        <div className="mis-cursos-grid">
          {cursosComprados.map(({ nombreCurso, priceId, fecha, sessionId }) => {
            console.log('Datos del curso:', nombreCurso, 'PriceId:', priceId);

            // Asegúrate de que el sessionId sea único y no undefined
            const imagenCurso = priceId ? imagenesCursos[priceId] : null;

            if (!imagenCurso) {
              console.log('Imagen no encontrada para el curso:', nombreCurso, 'PriceId:', priceId);
            }

            return (
              <div
                key={sessionId || priceId} // Usar sessionId o priceId como clave
                className="Micurso-card"
                style={{
                  backgroundImage: imagenCurso ? `url(${imagenCurso})` : 'none',
                }}
              >
                <div className="curso-card-overlay">
                  <h2>{nombreCurso}</h2>
                  <p>Fecha de compra: {new Date(fecha).toLocaleDateString()}</p>
                  <button className="micurso-btn" onClick={() => handleIrAlCurso(priceId)}>
                    Ir al curso
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && <p>No has comprado ningún curso aún.</p>
      )}
    </div>
  );
}

export default MisCursos;
