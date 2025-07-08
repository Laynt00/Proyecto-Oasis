package com.backend.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name="Comentarios")
public class Model_Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    private String texto;


    //Relación con Fuente
    @ManyToOne
    @JoinColumn(name="ID_Fuente")
    private Model_Fuente Fuente;

    //Relación con Banco
    @ManyToOne
    @JoinColumn(name="ID_Banco")
    private Model_Banco Banco;

    @ManyToOne
    @JoinColumn(name="ID_Parque")
    private Model_Parque Parque;

    @ManyToOne
    @JoinColumn(name="ID_Usuario")
    private Model_Usuario Usuario;

    public Model_Comentario(){}

    public Model_Comentario(String texto, Model_Fuente Fuente, Model_Banco Banco, Model_Parque Parque, Model_Usuario Usuario){
        this.texto = texto;
        this.Fuente = Fuente;//FK
        this.Banco = Banco;//FK
        this.Parque = Parque;//FK
        this.Usuario = Usuario;//FK
    }

    //GETTERS
    public Long getID() {
        return ID;
    }

    public String getTexto(){
        return texto;
    }

    public Model_Fuente getFuente() { return Fuente; }

    public Model_Banco getBanco() { return Banco; }

    public Model_Parque getParque() { return Parque; }

    public Model_Usuario getUsuario() { return Usuario; }

    //SETTERS
    public void setId(Long ID) {
        this.ID = ID;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setFuente(Model_Fuente Fuente) { this.Fuente = Fuente; }

    public void setBanco(Model_Banco Banco) { this.Banco = Banco; }

    public void getParque(Model_Parque Parque) { this.Parque = Parque; }

    public void getUsuario(Model_Usuario Usuario) { this.Usuario = Usuario; }

}
