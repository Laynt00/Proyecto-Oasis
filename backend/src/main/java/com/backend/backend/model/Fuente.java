package com.backend.backend.model;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Fuente")
public class Fuente extends Lugar{

    public Fuente(){}
    public Fuente(String nombre, double x, double y){
        super(nombre, x, y);
    }

}
