package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.backend.model.Model;

public interface Repository extends JpaRepository<Model, Long> {}


