package com.backend.backend.controller;

import com.backend.backend.dto.CommentDTO;
import com.backend.backend.dto.CommentInputDTO;
import com.backend.backend.model.Comment;
import com.backend.backend.model.Resource;
import com.backend.backend.model.User;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.ResourceRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*") // Permite cualquier origen
public class CommentController {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    private ResourceRepository resourceRepository;

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
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentInputDTO dto) {
        Optional<User> userOpt = userRepository.findById(dto.getUserId());
        Optional<Resource> resourceOpt = resourceRepository.findById(dto.getResourceId());

        if (userOpt.isEmpty() || resourceOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Comment comment = new Comment(userOpt.get(), resourceOpt.get(), dto.getText());
        commentRepository.save(comment);

        CommentDTO response = new CommentDTO(
                comment.getId(),
                comment.getText(),
                userOpt.get().getId(),
                userOpt.get().getName(),
                comment.getCreatedAt()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setText(commentDetails.getText());
                    Comment updated = commentRepository.save(comment);
                    return ResponseEntity.ok(new CommentDTO(
                            updated.getId(),
                            updated.getText(),
                            updated.getUser().getId(),
                            updated.getUser().getName(),
                            updated.getCreatedAt()
                    ));
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