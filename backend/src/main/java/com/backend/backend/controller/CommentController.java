package com.backend.backend.controller;

import com.backend.backend.dto.CommentDTO;
import com.backend.backend.model.Comment;
import com.backend.backend.repository.CommentRepository;
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

    public CommentController(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
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

    @GetMapping("/resource/{resourceId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByResourceId(@PathVariable Long resourceId) {
        List<Comment> comments = commentRepository.findByResourceId(resourceId);
        if (comments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<CommentDTO> dtos = comments.stream().map(comment ->
                new CommentDTO(
                        comment.getId(),
                        comment.getText(),
                        comment.getUser().getId(),
                        comment.getUser().getName(),
                        comment.getCreatedAt() // ← falta este argumento
                )
        ).toList();

        return ResponseEntity.ok(dtos);
    }



    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        // Verificar que el usuario existe
        if (!userRepository.existsById(comment.getUser().getId())) {
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