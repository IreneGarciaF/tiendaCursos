import React from 'react';
import './welcome.css';
import Calendar from './calendar';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoPlayer from './Video';
import fondoDiseño from '../../assets/c00bce58c817ec3a16945711111641d37320ae67-2240x1260.webp';

function CursoDiseño() {

  const backgroundImageStyle = {
    backgroundImage: `url(${fondoDiseño})`, 
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
            <h1>Curso de Diseño UX/UI</h1>
            <h3>Diseña experiencias que atrapen a tus usuarios.</h3>
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
                  href="https://github.com/midudev/aprendiendo-react" 
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
                  href="https://github.com/midudev/aprendiendo-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 2 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/Q3JBvLOzL0o?si=KMS836VXTSHHwo5S" 
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
                  href="https://github.com/midudev/aprendiendo-react" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 3 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/67ASQxnnyFE?si=KTz4_yxLvrKoZy-u" 
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
                  href="https://github.com/midudev/aprendiendo-react" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unidad 4 - Descargar PDF
              </Dropdown.Item>
              <Dropdown.Item
                  as="a"
                  href="https://youtu.be/1iAqFwTv4Ms?si=Mbuvfd8H4Eml5PVM" 
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

export default CursoDiseño;