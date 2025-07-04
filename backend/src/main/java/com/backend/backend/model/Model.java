package com.backend.backend.model;

import org.springframework.data.annotation.Id;

public class Model {
    @Id
    private int ID;

    private String nombre;
    private String descripcion;
    private String direccion;
    private String comentarios;

    //Getters y Setters


}
