package com.backend.backend.service;

import com.backend.backend.model.Comment;
import com.backend.backend.model.Resource;

import java.util.List;
import java.util.Optional;

public interface ResourceService {
    List<Resource> findAll();
    Optional<Resource> findById(Long id);
    void delete(Long id);
    List<Resource> findByComment(Comment comment);
}