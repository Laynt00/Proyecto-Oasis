import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments() {
    const url = "http://localhost:8080/api/comentario";
    const [id, setId] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [operation, setOperation] = useState(1);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                await getComments();
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        
        fetchComments();
    }, []);

    const getComments = async () => {
        try {
            const response = await axios.get(url);
            console.log("Comments fetched successfully:", response.data);
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(url, {
                user,
                comment
            });
            console.log("Comment submitted successfully:", response.data);
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
            
            {/* Renderizado de comentarios */}
            {comments.map((comentario) => (
                <div key={comentario.id} className="comentario">
                    <span><strong>{comentario.user}</strong> • Hace un tiempo</span>
                    <p>{comentario.texto}</p>
                    <button className="edit-comment-btn">Editar</button>
                    <button className="delete-comment-btn">Eliminar</button>
                </div>
            ))}
        </div>
    )
}