package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("DOG_PARK")
public class DogPark extends Resource {
    @Column(name = "photo")
    private String photo;

    // Constructores
    public DogPark() {}

    public DogPark(String name, Comment comment, Float coord_x, Float coord_y, String photo) {
        super(name, comment, coord_x, coord_y);
        this.photo = photo;
    }

    // Getters y setters
    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}