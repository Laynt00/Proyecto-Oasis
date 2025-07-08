package com.backend.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name="Comentarios")
public class Model_Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String texto;

    public Model_Comentario(){}

    public Model_Comentario(String texto){
        this.texto = texto;
    }

    //GETTERS
    public Long getID() {
        return ID;
    }

    public String getTexto(){
        return texto;
    }

    //SETTERS
    public void setId(Long ID) {
        this.ID = ID;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

}
