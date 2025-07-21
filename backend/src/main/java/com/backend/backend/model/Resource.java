package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "resource_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "resources")
public abstract class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    private Float coord_x;

    private Float coord_y;

    @Enumerated(EnumType.STRING)
    private ResourceType type;


    // Constructores, getters y setters
    public Resource() {}

    public Resource(String name, Comment comment, Float coord_x, Float coord_y, ResourceType type) {
        this.name = name;
        this.comment = comment; // Requiere un objeto Comment
        this.coord_x = coord_x;
        this.coord_y = coord_y;
        this.type = type;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Float getCoord_x() {
        return coord_x;
    }

    public void setCoord_x(Float coord_x) {
        this.coord_x = coord_x;
    }

    public Float getCoord_y() {
        return coord_y;
    }

    public void setCoord_y(Float coord_y) {
        this.coord_y = coord_y;
    }

    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType type) {
        this.type = type;
    }
}