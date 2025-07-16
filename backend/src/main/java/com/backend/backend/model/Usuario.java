package com.backend.backend.model;


import jakarta.persistence.*;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private boolean isadmin;

    public Usuario(){}
    public Usuario(String nombre, String email, boolean isadmin){
        this.nombre = nombre;
        this.email = email;
        this.isadmin = isadmin;
    }

    @OneToMany
    @JoinColumn (name = "id_comentario")
    private Comentario comentario;

    //GETTERS y SETTERS

    public Long getId(){ return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public boolean getIsadmin() { return isadmin; }
    public void setIsadmin(boolean isadmin) { this.isadmin = isadmin; }

    public Comentario getComentario() { return comentario; }

    public void setComentario(Comentario comentario) { this.comentario = comentario; }

}
