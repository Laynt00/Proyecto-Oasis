import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowComments.css"; 
import { useAuth } from "./AuthContext";

export default function ShowComments({ resourceId }) {
  const [comments, setComments] = useState([]);
  const {userId} = useAuth();
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

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
      setComments([]);
    }
  };

  const handleCommentSubmit = async () => {
  if (!comment.trim()) return;

  if (!resourceId) {
    alert("Error: No se encontró el recurso. Haz clic sobre una fuente para comentar.");
    return;
  }

  if (!userId) {
    alert("Debes iniciar sesión para comentar.");
    return;
  }

  const payload = {
    userId,
    resourceId,
    text: comment.trim(),
  };

  setSubmitting(true);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/comments",
      payload
    );
    setComments((prev) => [...prev, response.data]);
    setComment("");
  } catch (error) {
    console.error("Error al enviar comentario:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    alert("No se pudo enviar el comentario.");
  } finally {
    setSubmitting(false);
  }
};


  const handleDeleteComment = async (commentId) => {
    const confirm = window.confirm("¿Eliminar este comentario?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      alert("No se pudo eliminar el comentario.");
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/comments/${commentId}`,
        { text: editText.trim() }
      );

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, text: response.data.text } : c
        )
      );

      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error al actualizar comentario:", error);
      alert("No se pudo actualizar el comentario.");
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

          {editingId === comentario.id ? (
            <div className="edit-comment-box">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                className="submit-comment-btn"
                onClick={() => handleUpdateComment(comentario.id)}
                disabled={!editText.trim()}
              >
                Guardar
              </button>
              <button
                className="cancel-comment-btn"
                onClick={() => {
                  setEditingId(null);
                  setEditText("");
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <p>{comentario.text}</p>
          )}

          {comentario.userId === userId && (
            <div className="comment-actions">
              <button
                className="edit-comment-btn"
                onClick={() => {
                  setEditingId(comentario.id);
                  setEditText(comentario.text);
                }}
              >
                Editar
              </button>
              <button
                className="delete-comment-btn"
                onClick={() => handleDeleteComment(comentario.id)}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
