import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments({ resourceId, resourceType }) {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(1); // ID del usuario
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!resourceId || !resourceType) return;
        
        const getComments = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = `http://localhost:8080/api/comments?resourceId=${resourceId}&resourceType=${resourceType}`;
                const response = await axios.get(url);
                setComments(response.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
                setError("Error al cargar comentarios");
            } finally {
                setLoading(false);
            }
        };

        getComments();
    }, [resourceId, resourceType]);

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
        try {
            const url = `http://localhost:8080/api/comments`;
            const response = await axios.post(url, {
                user: { id: user },
                text: comment,
                resourceId,
                resourceType
            });
            setComments([...comments, response.data]);
            setComment("");
        } catch (err) {
            console.error("Error submitting comment:", err);
            setError("Error al enviar comentario");
        }
    };

    return (
        <div className="comentarios">
            <h3>Comentarios</h3>
            {loading && <p>Cargando comentarios...</p>}
            {error && <p className="error">{error}</p>}
            
            <input
                type="text"
                placeholder="Deja tu comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="submit-comment-btn" onClick={handleCommentSubmit}>
                Comentar
            </button>

            {comments.length === 0 && !loading ? (
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            ) : (
                comments.map((comentario) => (
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
                ))
            )}
        </div>
    );
}