package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Model_Banco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String nombre;
    private String descripcion;

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
}
