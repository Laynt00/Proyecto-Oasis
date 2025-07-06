package com.backend.backend.model;

import jakarta.persistence.Entity;

@Entity
public class Model_Fuente {
    private int ID;
    private String nombre;
    private String descripcion;

    //Constructor vacío
    public Model_Fuente(){}

    public Model_Fuente(String nombre, String descripcion){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    //GETTERS
    public String getNombre(){
        return nombre;
    }

    public String getDescripcion(){
        return descripcion;
    }

    //SETTERS
    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }
}
