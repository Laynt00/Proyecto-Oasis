package com.backend.backend.repository;

import com.backend.backend.model.Font;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FontRepository extends JpaRepository<Font, Long> {
    List<Font> findByCondition(String condition);
}