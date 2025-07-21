import React, { useState } from 'react';
import './RegistroPopup.css';

const RegistroPopup = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('ok');
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const resetForm = () => {
    setNombre('');
    setEstado('ok');
    setImagen(null);
  };

  const handleSubmit = () => {
    // Validación básica
    if (!nombre.trim()) {
      alert('Por favor, introduce un nombre para el sitio');
      return;
    }

    const nuevoRegistro = {
      nombre,
      estado,
      imagen
    };
    onSubmit(nuevoRegistro);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  console.log("Popup abierto:", isOpen);
  
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

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="ok">Ok</option>
          <option value="mal">Mal</option>
        </select>

        <div className="upload-container">
          <label htmlFor="imagen" className="upload-box">
            📷 +
          </label>
          <input
            type="file"
            accept="image/*"
            id="imagen"
            hidden
            onChange={handleImageChange}
          />
        </div>

        <div className="popup-buttons">
          <button onClick={handleSubmit}>Crear registro</button>
          <button onClick={handleClose}>Descartar</button>
        </div>
      </div>
    </div>
  );
};

export default RegistroPopup;