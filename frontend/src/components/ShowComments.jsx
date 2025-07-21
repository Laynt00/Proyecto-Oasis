import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments({ resourceId, comments: initialComments }) {
    const [comments, setComments] = useState(initialComments || []);
    const [user, setUser] = useState(1); // ID del usuario
    const [comment, setComment] = useState('');

    // Actualiza los comentarios cuando cambia el recurso
    useEffect(() => {
        setComments(initialComments || []);
    }, [resourceId, initialComments]);

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
        try {
            const response = await axios.post("http://localhost:8080/api/comments", {
                user: { id: user },
                text: comment,
                resource: { id: resourceId } // Envía el recurso asociado
            });
            setComments([...comments, response.data]);
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
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
            <button className="submit-comment-btn" onClick={handleCommentSubmit}>Comentar</button>

            {comments.map((comentario) => (
                <div key={comentario.id} className="comentario">
                    <span>
                        <strong>{comentario.user?.name || 'Usuario anónimo'}</strong>
                        • {comentario.createdAt ? new Date(comentario.createdAt).toLocaleDateString() : 'Ahora'}
                    </span>
                    <p>{comentario.text}</p>
                    {comentario.user?.id === user && (
                        <>
                            <button className="edit-comment-btn">Editar</button>
                            <button className="delete-comment-btn">Eliminar</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}