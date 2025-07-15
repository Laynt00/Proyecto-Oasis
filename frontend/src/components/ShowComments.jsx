import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

export default function ShowComments() {
    const url = "http://localhost:3000/api/comments"; // URL de comentarios
    const [id, setId] = useState('');
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState('');
    const [operation, setOperation] = useState(1);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                getComments();
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
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
        if (!user) {
            alert("Es necesario estar logueado para comentar");
            return;
        }

        try {
            const response = await axios.post(url, {
                user,
                comment
            });
            console.log("Comment submitted successfully:", response.data);
            setComments([...comments, response.data]);
            setUser("");
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="comentarios">
            <h3>Comentarios</h3>
            <input type="text" placeholder="Deja tu comentario..." />
            <button className="submit-comment-btn" onClick={handleCommentSubmit}>Comentar</button>
            <div className="comentario"></div>
            <span><strong>Usuario A</strong> • Hace un tiempo</span>
            <p>Buen sitio para recargar agua</p>
            <button className="edit-comment-btn">Boton de Editar</button>
            <button className="delete-comment-btn">Boton de Eliminar</button>

        </div>
    )
}
