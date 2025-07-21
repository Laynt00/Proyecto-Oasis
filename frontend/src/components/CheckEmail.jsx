import React from 'react';
import './ForgotPassword.css'; // Usa los mismos estilos del login

export default function CheckEmail() {
  return (
    <div className="forgot-password-page">
      <div className="div-forgot">
        <p>¡Revisa tu correo!</p>
        <p>
          Te hemos enviado un correo con instrucciones para restablecer tu contraseña.
          Si no lo ves, revisa tu carpeta de spam.
        </p>
      </div>

      <div className="div-forgot-form">
        <p>¿No recibiste nada?</p>
        <p>Puedes intentar enviar de nuevo o volver al login.</p>
        <a className="button-forgot-form" href="/login">
          Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
}
