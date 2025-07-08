package com.backend.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Model_Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String nombre;
    private String descripcion;

    @OneToMany(mappedBy = "Usuario", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Model_Comentario> comentario;


    //Constructor vacío
    public Model_Usuario(){}

    public Model_Usuario(String nombre, String descripcion){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    //GETTERS
    public Long getID() {
        return ID;
    }

    public String getNombre(){
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
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

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public void setComentario(List<Model_Comentario> comentario) {
        this.comentario = comentario;
    }

}
