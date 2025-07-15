package com.backend.backend.repository;

import com.backend.backend.model.Bench;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenchRepository extends JpaRepository<Bench, Long> {
    List<Bench> findByCondition(String condition);
}