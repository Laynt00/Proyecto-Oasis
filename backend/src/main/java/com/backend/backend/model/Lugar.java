package com.backend.backend.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_lugar", discriminatorType = DiscriminatorType.STRING)
public class Lugar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private double x;
    private double y;

    @OneToMany
    @JoinColumn (name="id_comentario")
    private List<Comentario> comentarios = new ArrayList<>();


    public Lugar(){}

    public Lugar(String nombre, double x, double y){
        this.nombre = nombre;
        this.x = x;
        this.y = y;
    }

    //GETTERS y SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public double getX() { return x; }
    public void setX(double x) { this.x = x; }

    public double getY() { return y; }
    public void setY(double y) { this.y = y; }

    public Comentario getComentario() { return comentario; }

    public void setComentario(Comentario comentario) { this.comentario = comentario; }

}
