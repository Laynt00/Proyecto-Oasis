package com.backend.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="Fuente")
public class Model_Fuente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String nombre;
    private double x;
    private double y;


    //Relacion
    @OneToMany(mappedBy = "Fuente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Model_Comentario> comentario;

    //Constructor vacío
    public Model_Fuente(){}

    public Model_Fuente(String nombre, double x, double y){
        this.nombre = nombre;
        this.x = x;
        this.y = y;
    }

    //GETTERS
    public Long getID() {
        return ID;
    }

    public String getNombre(){
        return nombre;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public List<Model_Comentario> getComentario() {
        return comentario;
    }


    //SETTERS
    public void setId(Long ID) {
        this.ID = ID;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public void setX(double x){
        this.x = x;
    }

    public void setY(double y){
        this.y = y;
    }

    public void setComentario(List<Model_Comentario> comentario) {
        this.comentario = comentario;
    }

}
