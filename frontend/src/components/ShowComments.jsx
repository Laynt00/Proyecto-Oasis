import React, { useState, useEffect } from 'react';
import './ShowComments.css';

const ShowComments = ({ resourceId }) => {  // Eliminamos resourceType de los props
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    console.log(resourceId);
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/comments/${resourceId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar comentarios');
        }
        
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (resourceId) {  // Solo verificamos resourceId ahora
      fetchComments();
    }
  }, [resourceId]);  // Eliminamos resourceType de las dependencias

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/comments/${resourceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Aquí deberías incluir el token de autenticación si es necesario
        },
        body: JSON.stringify({ content: newComment })
      });

      if (!response.ok) {
        throw new Error('Error al enviar comentario');
      }

      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Cargando comentarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="comments-container">
      <h3>Comentarios</h3>
      
      {comments.length === 0 ? (
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <strong>{comment.user?.username || 'Anónimo'}</strong>
              <p>{comment.content}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario..."
          required
        />
        <button type="submit">Enviar comentario</button>
      </form>
    </div>
  );
};

export default ShowComments;