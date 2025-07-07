package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Model_Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    private String nombre;

    //Constructor vacío
    public Model_Usuario(){}

    public Model_Usuario(String nombre, String descripcion){
        this.nombre = nombre;
    }

    //GETTERS
    public String getNombre(){
        return nombre;
    }


    //SETTERS
    public void setNombre(String nombre){
        this.nombre = nombre;
    }

}
