package com.backend.backend.service;

import com.backend.backend.model.Comment;
import com.backend.backend.model.User;
import com.backend.backend.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final UserService userService;

    public CommentServiceImpl(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return commentRepository.findById(id);
    }

    @Override
    public Comment save(Comment comment) {
        // Verificar que el usuario existe
        if (!userService.existsById(comment.getUser().getId())) {
            throw new RuntimeException("User not found with id: " + comment.getUser().getId());
        }
        return commentRepository.save(comment);
    }

    @Override
    public Comment update(Long id, Comment comment) {
        return commentRepository.findById(id)
                .map(existingComment -> {
                    existingComment.setText(comment.getText());
                    return commentRepository.save(existingComment);
                })
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
    }

    @Override
    public void delete(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public List<Comment> findByUser(User user) {
        return commentRepository.findByUser(user);
    }

    @Override
    public boolean existsById(Long id) {
        return commentRepository.existsById(id);
    }
}