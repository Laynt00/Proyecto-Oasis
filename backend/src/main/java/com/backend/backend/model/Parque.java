package com.backend.backend.model;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Parque")
public class Parque extends Lugar {
    public Parque(){}
    public Parque(String nombre, double x, double y){
        super(nombre, x, y);
    }
}
