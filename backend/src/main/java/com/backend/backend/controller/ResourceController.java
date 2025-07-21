package com.backend.backend.controller;

import com.backend.backend.model.Resource;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.ResourceRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*") // Permite cualquier origen
public class ResourceController {
    private final ResourceRepository resourceRepository;
    private final CommentRepository commentRepository;

    public ResourceController(ResourceRepository resourceRepository, CommentRepository commentRepository) {
        this.resourceRepository = resourceRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResourceById(@PathVariable Long id) {
        return resourceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        if (resourceRepository.existsById(id)) {
            resourceRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}