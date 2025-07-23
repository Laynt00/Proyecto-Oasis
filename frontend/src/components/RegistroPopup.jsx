import React, { useState } from 'react';
import './RegistroPopup.css';

const RegistroPopup = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('font');
  const [estado, setEstado] = useState('ok');
  const [imagen, setImagen] = useState(null);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  // Obtener la ubicación actual al abrir el popup
  React.useEffect(() => {
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
        }
      );
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const resetForm = () => {
    setNombre('');
    setTipo('font');
    setEstado('ok');
    setImagen(null);
    setLatitud(null);
    setLongitud(null);
  };

  const handleSubmit = async () => {
    if (!nombre.trim()) {
      alert('Por favor, introduce un nombre para el sitio');
      return;
    }

    if (!latitud || !longitud) {
      alert('No se pudo obtener la ubicación. Por favor, asegúrate de permitir el acceso a la ubicación.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', nombre);
      formData.append('type', tipo);
      formData.append('status', estado);
      formData.append('coord_x', longitud.toString());
      formData.append('coord_y', latitud.toString());
      
      if (imagen) {
        formData.append('photo', imagen);
      }

      const response = await fetch('http://localhost:8080/api/resources', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al crear el recurso');
      }

      const data = await response.json();
      onSubmit(data); // Puedes pasar los datos creados al componente padre si es necesario
      resetForm();
      onClose();
      alert('Recurso creado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el recurso: ' + error.message);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Introduce los datos de la nueva ubicación:</h2>

        <label>Nombre del sitio:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe el nombre..."
        />

        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="font">Fuente</option>
          <option value="bench">Banco</option>
          <option value="dogpark">Parque para perros</option>
        </select>

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="ok">Ok</option>
          <option value="bad">Mal</option>
        </select>

        <div className="popup-buttons">
          <button onClick={handleSubmit}>Crear registro</button>
          <button onClick={handleClose}>Descartar</button>
        </div>
      </div>
    </div>
  );
};

export default RegistroPopup;