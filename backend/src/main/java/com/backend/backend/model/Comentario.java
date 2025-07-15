package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
}
