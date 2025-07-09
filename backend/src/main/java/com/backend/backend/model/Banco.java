package com.backend.backend.model;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Banco")
public class Banco extends Lugar{
    public Banco(){}
    public Banco(String nombre, double x, double y){
        super(nombre, x, y);
    }
}
