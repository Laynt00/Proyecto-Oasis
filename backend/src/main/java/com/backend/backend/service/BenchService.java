package com.backend.backend.service;

import com.backend.backend.model.Bench;

import java.util.List;
import java.util.Optional;

public interface BenchService {
    List<Bench> findAll();
    Optional<Bench> findById(Long id);
    Bench save(Bench bench);
    Bench update(Long id, Bench bench);
    void delete(Long id);
    List<Bench> findByStatus(String status);
}