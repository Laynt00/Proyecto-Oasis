import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments({ resourceId }) {
    const [comments, setComments] = useState([]);
    const [userId] = useState(1); // ID del usuario
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (resourceId) {
            fetchComments();
        }
    }, [resourceId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/comments/resource/${resourceId}`);
            setComments(response.data);
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
        try {
            const response = await axios.post(`http://localhost:8080/api/comments`, {
                userId: userId,
                text: comment,
                resourceId: resourceId
            });
            setComments([...comments, response.data]);
            setComment("");
        } catch (error) {
            console.error("Error al enviar comentario:", error);
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
            />
            <button className="submit-comment-btn" onClick={handleCommentSubmit}>
                Comentar
            </button>

            {comments.map((comentario) => (
                <div key={comentario.id} className="comentario">
                    <span>
                        <strong>{comentario.userName || "Usuario anónimo"}</strong>
                        {" • "}
                        {new Date(comentario.createdAt).toLocaleString()}
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
