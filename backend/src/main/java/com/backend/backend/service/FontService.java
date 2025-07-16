package com.backend.backend.service;

import com.backend.backend.model.Font;

import java.util.List;
import java.util.Optional;

public interface FontService {
    List<Font> findAll();
    Optional<Font> findById(Long id);
    Font save(Font font);
    Font update(Long id, Font font);
    void delete(Long id);
    List<Font> findByStatus(String status);
}