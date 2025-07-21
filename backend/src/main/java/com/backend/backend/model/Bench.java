package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("BENCH")
public class Bench extends Resource {
    private String status;

    @Column(name = "photo")
    private String photo;

    // Constructores
    public Bench() {}

    public Bench(String name, Comment comment, Float coord_x, Float coord_y, String status, String photo, ResourceType type) {
        super(name, comment, coord_x, coord_y, type);
        this.status = status;
        this.photo = photo;
    }

    // Getters y setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}