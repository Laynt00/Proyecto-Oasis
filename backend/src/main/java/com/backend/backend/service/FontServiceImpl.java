package com.backend.backend.service;

import com.backend.backend.model.Font;
import com.backend.backend.model.ResourceType;
import com.backend.backend.repository.FontRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FontServiceImpl implements FontService {
    private final FontRepository fontRepository;
    private final CommentService commentService;

    public FontServiceImpl(FontRepository fontRepository, CommentService commentService) {
        this.fontRepository = fontRepository;
        this.commentService = commentService;
    }

    @Override
    public List<Font> findAll() {
        return fontRepository.findByType("FONT");
    }

    @Override
    public Optional<Font> findById(Long id) {
        return fontRepository.findById(id);
    }

    @Override
    public Font save(Font font) {
        if (font.getComment() != null && !commentService.existsById(font.getComment().getId())) {
            throw new RuntimeException("Comment not found with id: " + font.getComment().getId());
        }
        return fontRepository.save(font);
    }

    @Override
    public Font update(Long id, Font font) {
        return fontRepository.findById(id)
                .map(existingFont -> {
                    existingFont.setName(font.getName());
                    existingFont.setCoord_x(font.getCoord_x());
                    existingFont.setCoord_y(font.getCoord_y());
                    existingFont.setComment(font.getComment());
                    existingFont.setStatus(font.getStatus());
                    existingFont.setPhoto(font.getPhoto());
                    return fontRepository.save(existingFont);
                })
                .orElseThrow(() -> new RuntimeException("Font not found with id: " + id));
    }

    @Override
    public void delete(Long id) {
        fontRepository.deleteById(id);
    }

    @Override
    public List<Font> findByStatus(String status) {
        return fontRepository.findByStatus(status);
    }
}