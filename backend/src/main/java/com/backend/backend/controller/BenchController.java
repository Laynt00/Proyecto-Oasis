package com.backend.backend.controller;

import com.backend.backend.model.Bench;
import com.backend.backend.repository.BenchRepository;
import com.backend.backend.repository.CommentRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/benches")
@CrossOrigin(origins = "*") // Permite cualquier origen
public class BenchController {
    private final BenchRepository benchRepository;
    private final CommentRepository commentRepository;

    public BenchController(BenchRepository benchRepository, CommentRepository commentRepository) {
        this.benchRepository = benchRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Bench>> getAllBenches() {
        return ResponseEntity.ok(benchRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bench> getBenchById(@PathVariable Long id) {
        return benchRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Bench> createBench(@RequestBody Bench bench) {
        if (bench.getComment() != null && !commentRepository.existsById(bench.getComment().getId())) {
            return ResponseEntity.badRequest().build();
        }
        Bench savedBench = benchRepository.save(bench);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBench);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bench> updateBench(@PathVariable Long id, @RequestBody Bench benchDetails) {
        return benchRepository.findById(id)
                .map(bench -> {
                    bench.setName(benchDetails.getName());
                    bench.setCoord_x(benchDetails.getCoord_x());
                    bench.setCoord_y(benchDetails.getCoord_y());
                    bench.setComment(benchDetails.getComment());
                    bench.setStatus(benchDetails.getStatus());
                    bench.setPhoto(benchDetails.getPhoto());
                    return ResponseEntity.ok(benchRepository.save(bench));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}