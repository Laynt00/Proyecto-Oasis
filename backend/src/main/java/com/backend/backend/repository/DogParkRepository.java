package com.backend.backend.repository;

import com.backend.backend.model.DogPark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DogParkRepository extends JpaRepository<DogPark, Long> {
    List<DogPark> findByNameContaining(String name);
}