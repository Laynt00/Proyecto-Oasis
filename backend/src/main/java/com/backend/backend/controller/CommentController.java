package com.backend.backend.controller;

import com.backend.backend.model.Comment;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.ResourceRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*") // Permite cualquier origen
public class CommentController {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;

    public CommentController(CommentRepository commentRepository,
                             UserRepository userRepository,
                             ResourceRepository resourceRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.resourceRepository = resourceRepository;
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        return ResponseEntity.ok(commentRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        return commentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        // Check if user exists and resource exists and is not null
        if (comment.getUser() == null || !userRepository.existsById(comment.getUser().getId()) ||
                comment.getResource() == null || !resourceRepository.existsById(comment.getResource().getId())) {
            return ResponseEntity.badRequest().build();
        }
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setText(commentDetails.getText());
                    return ResponseEntity.ok(commentRepository.save(comment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}