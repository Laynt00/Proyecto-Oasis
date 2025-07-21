import React from 'react';
import './UserPanel.css'; // Usa el estilo antiguo que ya tenías
import userIcon from '../assets/userIcon.png'; // Usa el icono original

const UserPanel = ({ onCrearRegistro }) => {
  return (
    <div className="popup-login flex">
      <figure className="user-appearance">
        <img src={userIcon} alt="Usuario" />
      </figure>
      <p className="popup-login-title">USUARIO REGISTRADO</p>
      <p>¿Quieres registrar un lugar?</p>
      <button className="popup-button popup-button-blue" onClick={onCrearRegistro}>
        Crear registro
      </button>
      <button className="popup-button popup-button-red">
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserPanel;
