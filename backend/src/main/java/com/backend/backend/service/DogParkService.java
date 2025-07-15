package com.backend.backend.service;

import com.backend.backend.model.DogPark;

import java.util.List;
import java.util.Optional;

public interface DogParkService {
    List<DogPark> findAll();
    Optional<DogPark> findById(Long id);
    DogPark save(DogPark dogPark);
    DogPark update(Long id, DogPark dogPark);
    void delete(Long id);
    List<DogPark> findByNameContaining(String name);
}