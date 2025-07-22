package com.backend.backend.dto;

public class CommentInputDTO {
    private Long userId;
    private Long resourceId;
    private String text;

    // Constructor vacío necesario para la deserialización
    public CommentInputDTO() {}

    public CommentInputDTO(Long userId, Long resourceId, String text) {
        this.userId = userId;
        this.resourceId = resourceId;
        this.text = text;
    }

    // Getters y Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
