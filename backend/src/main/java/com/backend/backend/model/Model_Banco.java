package com.backend.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Model_Banco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String nombre;
    private String descripcion;

    //Relación con comentario
    @OneToMany(mappedBy = "Banco", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Model_Comentario> comentario;

    //Constructor vacío
    public Model_Banco(){}

    public Model_Banco(String nombre, String descripcion){
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

    public String getDescripcion(){
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

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public void setComentario(List<Model_Comentario> comentario) {
        this.comentario = comentario;
    }
}
