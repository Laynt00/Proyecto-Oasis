package com.backend.backend.service;

import com.backend.backend.model.DogPark;
import com.backend.backend.repository.DogParkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DogParkServiceImpl implements DogParkService {
    private final DogParkRepository dogParkRepository;
    private final CommentService commentService;

    public DogParkServiceImpl(DogParkRepository dogParkRepository, CommentService commentService) {
        this.dogParkRepository = dogParkRepository;
        this.commentService = commentService;
    }

    @Override
    public List<DogPark> findAll() {
        return dogParkRepository.findAll();
    }

    @Override
    public Optional<DogPark> findById(Long id) {
        return dogParkRepository.findById(id);
    }

    @Override
    public DogPark save(DogPark dogPark) {
        if (dogPark.getComment() != null && !commentService.existsById(dogPark.getComment().getId())) {
            throw new RuntimeException("Comment not found with id: " + dogPark.getComment().getId());
        }
        return dogParkRepository.save(dogPark);
    }

    @Override
    public DogPark update(Long id, DogPark dogPark) {
        return dogParkRepository.findById(id)
                .map(existingDogPark -> {
                    existingDogPark.setName(dogPark.getName());
                    existingDogPark.setPosition(dogPark.getPosition());
                    existingDogPark.setComment(dogPark.getComment());
                    existingDogPark.setPhoto(dogPark.getPhoto());
                    return dogParkRepository.save(existingDogPark);
                })
                .orElseThrow(() -> new RuntimeException("DogPark not found with id: " + id));
    }

    @Override
    public void delete(Long id) {
        dogParkRepository.deleteById(id);
    }

    @Override
    public List<DogPark> findByNameContaining(String name) {
        return dogParkRepository.findByNameContaining(name);
    }
}