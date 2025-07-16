package com.backend.backend.service;

import com.backend.backend.model.Comment;
import com.backend.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> findAll();
    Optional<Comment> findById(Long id);
    Comment save(Comment comment);
    Comment update(Long id, Comment comment);
    void delete(Long id);
    List<Comment> findByUser(User user);
    boolean existsById(Long id);
}