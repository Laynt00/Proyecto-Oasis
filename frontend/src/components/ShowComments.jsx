import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments({ resourceId, resourceType }) {
    const url = `http://localhost:8080/api/comments?resourceId=${resourceId}&resourceType=${resourceType}`;
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(1); // ID del usuario
    const [comment, setComment] = useState('');

    useEffect(() => {
        getComments();
    }, [resourceId, resourceType]); // Vuelve a cargar cuando cambia el recurso

    const getComments = async () => {
        try {
            const response = await axios.get(url);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
        try {
            const response = await axios.post(url, {
                user: { id: user },
                text: comment,
                resourceId,
                resourceType
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
                        • {new Date(comentario.createdAt).toLocaleDateString()}
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