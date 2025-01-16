import React from 'react';
import './welcome.css';
import Calendar from './calendar';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoPlayer from './Video';
import fondoJava from '../../assets/gabriel-heinzer-g5jpH62pwes-unsplash-scaled.jpg';

function CursoJava() {

  const backgroundImageStyle = {
    backgroundImage: `url(${fondoJava})`, 
    backgroundSize: 'cover', 
    backgroundPosition: '20% 20%',
    height: '40vh', 
    width: '80%',
  };

  return (
    <div className="main-container">
  
      <div className="row-1">
        <div className="column-left">
          <div className="welcome-section">
            <div className="titulo-welcome" style={backgroundImageStyle}>
            <h1>Curso de JavaScript</h1>
            <h3>Aprende el lenguaje de la web.</h3>
            </div>
            <div className="Video-bienvenida">
            <VideoPlayer />
            </div>
          </div>
        </div>

        <div className="column-right">
          <div className="calendar-section">
            <Calendar />
          </div>
        </div>
      </div>

 
      <div className="row-2">
        <div className="temario">
            <h1> Contenido del curso </h1>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <span>Tema 1</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                  as="a"
                  href="https://github.com/estefaniacn/freecodecamp-curso-javascript" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  Unidad 1 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/iHqa6ojKnHI?si=Eqf29NOsGL7EIhlF" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 1 - Videoclase
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Tema 2
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                  as="a"
                  href="https://github.com/estefaniacn/freecodecamp-curso-javascript"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 2 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/yIr_1CasXkM?si=OVTAQO5xfMfnrfJ7" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 2 - Videoclase
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Tema 3
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                  as="a"
                  href="https://github.com/estefaniacn/freecodecamp-curso-javascript" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 3 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/5-cEC7gmVPk?si=HYnhLX01sXAbxdEK" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 3 - Videoclase
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Tema 4
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                  as="a"
                  href="https://github.com/estefaniacn/freecodecamp-curso-javascript" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 4 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/AHzxeA2aEk0?si=2BgI6KvorAQVX1cP" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 4 - Videoclase
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
    </div>
  );
}

export default CursoJava;