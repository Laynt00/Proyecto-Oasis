package com.backend.backend.controller;

import com.backend.backend.model.Font;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.FontRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/fonts")
@CrossOrigin(origins = "*") // Permite cualquier origen
public class FontController {
    private final FontRepository fontRepository;
    private final CommentRepository commentRepository;

    public FontController(FontRepository fontRepository, CommentRepository commentRepository) {
        this.fontRepository = fontRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Font>> getAllFonts() {
        return ResponseEntity.ok(fontRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Font> getFontById(@PathVariable Long id) {
        return fontRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Font> createFont(@RequestBody Font font) {
        if (font.getComment() != null && !commentRepository.existsById(font.getComment().getId())) {
            return ResponseEntity.badRequest().build();
        }
        Font savedFont = fontRepository.save(font);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFont);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Font> updateFont(@PathVariable Long id, @RequestBody Font fontDetails) {
        return fontRepository.findById(id)
                .map(font -> {
                    font.setName(fontDetails.getName());
                    font.setCoord_x(fontDetails.getCoord_x());
                    font.setCoord_y(fontDetails.getCoord_y());
                    font.setComment(fontDetails.getComment());
                    font.setStatus(fontDetails.getStatus());
                    font.setPhoto(fontDetails.getPhoto());
                    return ResponseEntity.ok(fontRepository.save(font));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}