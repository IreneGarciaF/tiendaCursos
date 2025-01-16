import React, { useState, useEffect } from 'react';
import { Calendar as ReactBigCalendar, DateLocalizer } from 'react-big-calendar'; // Cambiado a DateLocalizer
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';


// Configurar el localizador de fechas para que Big Calendar funcione con `date-fns`
const localizer = new DateLocalizer({
  formats: {
    dateFormat: 'dd',
    dayFormat: 'eeee',
    weekdayFormat: 'dddd',
    monthHeaderFormat: 'MMMM yyyy',
    dayHeaderFormat: 'MMMM dd, yyyy',
  },
  firstOfWeek: (locale) => startOfWeek(new Date(), { locale }),  // Corregido aquí
  getDay,
  format,
  parse,
  locale: enUS,
});

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Simulación de eventos para el calendario
  useEffect(() => {
    const fetchEvents = () => {
      const sampleEvents = [
        {
          title: 'Bienvenida al curso',
          start: new Date(2024, 11, 12, 10, 0), 
          end: new Date(2024, 11, 12, 12, 0),
          description: 'Se realizará una reunión grupal con todos los profesores y alumnos matriculados' ,
        },
        {
          title: 'Simulacro de examenes',
          start: new Date(2024, 11, 20, 14, 0),
          end: new Date(2024, 11, 20, 16, 0),  
          description: 'Durante todo el día estará disponible en la sección de "Simulacros" para que el alumno pueda repasar los conocimientos adquiridos', 
        },
        {
            title: 'Examenes finales',
            start: new Date(2024, 11, 29, 14, 0),
            end: new Date(2024, 11, 29, 16, 0), 
            description: 'Se realizarán de forma presencial en el centro',  
          },
      ];
      setEvents(sampleEvents);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <ReactBigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => alert(`Evento seleccionado: \nTítulo: ${event.title}\nDescripción: ${event.description}`)}
        onSelectSlot={(slotInfo) => alert('Slot seleccionado: ' + slotInfo.start)}
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
      />
    </div>
  );
};

export default Calendar;