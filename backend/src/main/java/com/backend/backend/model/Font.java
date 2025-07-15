package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("FONT")
public class Font extends Resource {
    @Column(name = "condition")
    private String condition;

    @Column(name = "photo")
    private String photo;

    // Constructores, getters y setters
    public Font() {}

    public Font(String name, Comment comment, String position, String condition, String photo) {
        super(name, comment, position);
        this.condition = condition;
        this.photo = photo;
    }

    // Getters y setters
    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}