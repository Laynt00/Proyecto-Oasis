import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments({ resourceId }) {
  const [comments, setComments] = useState([]);
  const [userId] = useState(1); // Simulamos un usuario autenticado con ID 1
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (resourceId) {
      fetchComments();
    }
  }, [resourceId]);

  const fetchComments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/comments/resource/${resourceId}`
    );

    setComments(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    setComments([]); // ⛑ Asegura estado válido incluso en error
  }
};


  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    setSubmitting(true);

    const payload = {
        user: { id: userId },
        resource: { id: resourceId }, // 🔁 esto es esencial
        text: comment.trim()
    };

    console.log("Enviando comentario:", payload);

    try {
        const response = await axios.post(`http://localhost:8080/api/comments`, payload);
        setComments((prev) => [...prev, response.data]);
        setComment("");
    } catch (error) {
        console.error("Error al enviar comentario:", error);
        if (error.response) {
            console.error("Respuesta del servidor:", error.response.data);
        }
    } finally {
        setSubmitting(false);
    }
};


  return (
    <div className="comentarios">
      <h3>Comentarios</h3>

      <input
        type="text"
        placeholder="Deja tu comentario..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={submitting}
      />
      <button
        className="submit-comment-btn"
        onClick={handleCommentSubmit}
        disabled={submitting || !comment.trim()}
      >
        {submitting ? "Enviando..." : "Comentar"}
      </button>

      {comments.length === 0 && <p>Aún no hay comentarios.</p>}

      {comments.map((comentario) => (
        <div key={comentario.id} className="comentario">
          <span>
            <strong>{comentario.userName || "Usuario anónimo"}</strong>
            {" • "}
            {comentario.createdAt
              ? new Date(comentario.createdAt).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Fecha desconocida"}
          </span>
          <p>{comentario.text}</p>

          {comentario.userId === userId && (
            <div className="comment-actions">
              <button className="edit-comment-btn">Editar</button>
              <button className="delete-comment-btn">Eliminar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
