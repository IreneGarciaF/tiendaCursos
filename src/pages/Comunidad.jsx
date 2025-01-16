import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebaseConfig"; // Asegúrate de importar firestore
import { collection, addDoc, getDocs } from "firebase/firestore"; // Agregamos las funciones necesarias de Firestore
import "../styles/Comunidad.css";

function Comunidad() {
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [respuesta, setRespuesta] = useState(''); 
  const [comentarioId, setComentarioId] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState('Anonimo'); // Estado para el nombre de usuario

  // Obtener el usuario de Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Obtener el nombre del usuario desde el objeto 'user' de Firebase
        const displayName = user.displayName;

        if (displayName) {
          setUsuarioNombre(displayName); // Si existe el displayName, usarlo
        } else {
          // Si no existe, buscar el nombre en Firestore como fallback
          try {
            const userDocRef = doc(firestore, "usuarios", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUsuarioNombre(userData.nombre || "Anonimo");
            } else {
              setUsuarioNombre("Anonimo");
            }
          } catch (error) {
            console.error("Error al obtener el nombre del usuario:", error);
            setUsuarioNombre("Anonimo");
          }
        }
      } else {
        setUsuarioNombre("Anonimo"); // Si no hay usuario autenticado, mostramos "Anonimo"
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, []);

  // Obtener los comentarios desde Firestore
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const comentariosRef = collection(firestore, "comentarios");
        const querySnapshot = await getDocs(comentariosRef);

        const comentariosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComentarios(comentariosData); // Actualizamos el estado con los comentarios de Firestore
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchComentarios();
  }, []);

  // Guardar los comentarios en Firestore
  const saveComentarioToFirestore = async (nuevoComentario) => {
    try {
      const comentariosRef = collection(firestore, "comentarios");
      await addDoc(comentariosRef, nuevoComentario); // Agregar el nuevo comentario a Firestore
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!comentario) {
      alert('El comentario no puede estar vacío');
      return;
    }

    const nuevoComentario = {
      usuario: usuarioNombre, // Usamos el nombre que obtuvimos (displayName o Firestore)
      mensaje: comentario,
      respuestas: [] 
    };

    await saveComentarioToFirestore(nuevoComentario); // Guardamos el comentario en Firestore
    setComentarios(prevComentarios => [...prevComentarios, nuevoComentario]); // Actualizamos el estado local
    setComentario('');
  };

  // Manejar las respuestas
  const handleRespuestaSubmit = async (e) => {
    e.preventDefault();
    if (!respuesta) {
      alert('La respuesta no puede estar vacía');
      return;
    }

    const nuevoComentario = {
      usuario: usuarioNombre, // Usamos el nombre para las respuestas
      mensaje: respuesta,
    };

    const updatedComentarios = comentarios.map(comentario =>
      comentario.id === comentarioId
        ? { ...comentario, respuestas: [...comentario.respuestas, nuevoComentario] }
        : comentario
    );

    setComentarios(updatedComentarios);
    setRespuesta('');
    setComentarioId(null);
  };

  return (
    <div className="comunidad-container">
      <h1>Únete a nuestra Comunidad</h1>
      <p>Comparte tus ideas, resuelve dudas y crece junto a otros estudiantes.</p>
      
      {/* Formulario para publicar un comentario */}
      <form onSubmit={handleSubmit}>
        <textarea 
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe tu comentario aquí">
        </textarea>
        <button type="submit">Publicar Comentario</button>
      </form>

      {/* Mostrar los comentarios y respuestas */}
      <ul className="comentarios">
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="comentario">
            <strong>{comentario.usuario}:</strong> {comentario.mensaje}

            {/* Mostrar respuestas si existen */}
            <ul className="respuestas">
              {comentario.respuestas.map((respuesta, index) => (
                <li key={index} className="respuesta">
                  <strong>{respuesta.usuario}:</strong> {respuesta.mensaje}
                </li>
              ))}
            </ul>

            {/* Formulario para responder a un comentario */}
            <button onClick={() => setComentarioId(comentario.id)}>
              Responder
            </button>

            {comentarioId === comentario.id && (
              <form onSubmit={handleRespuestaSubmit}>
                <textarea
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  placeholder="Escribe tu respuesta aquí">
                </textarea>
                <button type="submit">Publicar Respuesta</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comunidad;
