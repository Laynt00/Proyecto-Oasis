package com.backend.backend.repository;

import com.backend.backend.model.Comment;
import com.backend.backend.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByComment(Comment comment);
}