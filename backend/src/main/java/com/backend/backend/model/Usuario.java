package com.backend.backend.model;


import jakarta.persistence.*;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String password;
    private boolean isadmin;

    public Usuario(){}
    public Usuario(String nombre, String password, boolean isadmin){
        this.nombre = nombre;
        this.password = password;
        this.isadmin = isadmin;
    }

    //GETTERS y SETTERS

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean getIsadmin() { return isadmin; }
    public void setIsadmin(boolean isadmin) { this.isadmin = isadmin; }

    public Long getId(){
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
