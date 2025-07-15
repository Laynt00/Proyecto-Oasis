package com.backend.backend.service;

import com.backend.backend.model.Bench;
import com.backend.backend.repository.BenchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BenchServiceImpl implements BenchService {
    private final BenchRepository benchRepository;
    private final CommentService commentService;

    public BenchServiceImpl(BenchRepository benchRepository, CommentService commentService) {
        this.benchRepository = benchRepository;
        this.commentService = commentService;
    }

    @Override
    public List<Bench> findAll() {
        return benchRepository.findAll();
    }

    @Override
    public Optional<Bench> findById(Long id) {
        return benchRepository.findById(id);
    }

    @Override
    public Bench save(Bench bench) {
        if (bench.getComment() != null && !commentService.existsById(bench.getComment().getId())) {
            throw new RuntimeException("Comment not found with id: " + bench.getComment().getId());
        }
        return benchRepository.save(bench);
    }

    @Override
    public Bench update(Long id, Bench bench) {
        return benchRepository.findById(id)
                .map(existingBench -> {
                    existingBench.setName(bench.getName());
                    existingBench.setPosition(bench.getPosition());
                    existingBench.setComment(bench.getComment());
                    existingBench.setCondition(bench.getCondition());
                    existingBench.setPhoto(bench.getPhoto());
                    return benchRepository.save(existingBench);
                })
                .orElseThrow(() -> new RuntimeException("Bench not found with id: " + id));
    }

    @Override
    public void delete(Long id) {
        benchRepository.deleteById(id);
    }

    @Override
    public List<Bench> findByCondition(String condition) {
        return benchRepository.findByCondition(condition);
    }
}