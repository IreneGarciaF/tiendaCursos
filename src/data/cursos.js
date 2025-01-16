import imagenCursoReact from "../assets/1_odW0CyTVxMVt5s3yhjjOhw.png";
import imagenCursoJavaScript from "../assets/gabriel-heinzer-g5jpH62pwes-unsplash-scaled.jpg";
import imagenCursoUXUI from "../assets/c00bce58c817ec3a16945711111641d37320ae67-2240x1260.webp";

const cursos = [
  { 
    id: "123e4567-e89b-12d3-a456-426614174000", 
    titulo: "Curso de React", 
    descripcion: "Domina el desarrollo web moderno.", 
    precio: "49.99 €", 
    imagen: imagenCursoReact,
    priceId: "price_1QhRigG8GAsKGTLjWzZGP9hC"
  },
  { 
    id: "aaaa4567-e89b-12d3-a456-426614174001", 
    titulo: "Curso de JavaScript", 
    descripcion: "Aprende el lenguaje de la web.", 
    precio: "39.99 €", 
    imagen: imagenCursoJavaScript, 
    priceId: "price_1QhRjbG8GAsKGTLj8C1V8Pma"
  },
  { 
    id: "bbbb4567-e89b-12d3-a456-426614174002", 
    titulo: "Curso de Diseño UX/UI", 
    descripcion: "Diseña experiencias que atrapen.", 
    precio: "29.99 €", 
    imagen: imagenCursoUXUI, 
    priceId: "price_1QhRk2G8GAsKGTLjH23B3RpG"
  }
];

export default cursos;
