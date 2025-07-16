package com.backend.backend.controller;

import com.backend.backend.model.DogPark;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.DogParkRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/api/dogparks")
public class DogParkController {
    private final DogParkRepository dogParkRepository;
    private final CommentRepository commentRepository;

    public DogParkController(DogParkRepository dogParkRepository, CommentRepository commentRepository) {
        this.dogParkRepository = dogParkRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public ResponseEntity<List<DogPark>> getAllDogParks() {
        return ResponseEntity.ok(dogParkRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DogPark> getDogParkById(@PathVariable Long id) {
        return dogParkRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DogPark> createDogPark(@RequestBody DogPark dogPark) {
        if (dogPark.getComment() != null && !commentRepository.existsById(dogPark.getComment().getId())) {
            return ResponseEntity.badRequest().build();
        }
        DogPark savedDogPark = dogParkRepository.save(dogPark);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDogPark);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DogPark> updateDogPark(@PathVariable Long id, @RequestBody DogPark dogParkDetails) {
        return dogParkRepository.findById(id)
                .map(dogPark -> {
                    dogPark.setName(dogParkDetails.getName());
                    dogPark.setCoord_x(dogParkDetails.getCoord_x());
                    dogPark.setCoord_y(dogParkDetails.getCoord_y());
                    dogPark.setComment(dogParkDetails.getComment());
                    dogPark.setPhoto(dogParkDetails.getPhoto());
                    return ResponseEntity.ok(dogParkRepository.save(dogPark));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}