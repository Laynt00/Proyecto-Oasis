package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data                  // Genera getters, setters, toString, equals, etc.
@NoArgsConstructor     // Constructor vacío (necesario para JPA)
@AllArgsConstructor    // Constructor con todos los campos
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String texto;

    @ManyToOne
    @JoinColumn(lugar = "id_lugar")
    @JoinColumn(usuario = "id_usuario")
    private Lugar lugar;
    private Usuario usuario;

    public Comentario(String texto, Lugar lugar, User usuario) {
        this.texto = texto;
        this.lugar = lugar;
        this.usuario = usuario;
    }

}
