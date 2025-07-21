import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/check-email');
    } catch (err) {
      setError('Algo salió mal. Intenta más tarde.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="div-forgot">
        <p>¿Olvidaste tu contraseña?</p>
        <p>Introduce tu correo y te enviaremos instrucciones para recuperarla.</p>
      </div>

      <div className="div-forgot-form">
        <p>Recuperar contraseña</p>
        <form className="form-forgot" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="button-forgot-form"
          >
            {sending ? 'Enviando...' : 'Enviar instrucciones'}
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
