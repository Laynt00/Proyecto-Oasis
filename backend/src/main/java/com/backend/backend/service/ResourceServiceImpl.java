package com.backend.backend.service;

import com.backend.backend.model.Comment;
import com.backend.backend.model.Resource;
import com.backend.backend.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ResourceServiceImpl implements ResourceService {
    private final ResourceRepository resourceRepository;

    public ResourceServiceImpl(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @Override
    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }

    @Override
    public Optional<Resource> findById(Long id) {
        return resourceRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        resourceRepository.deleteById(id);
    }

    @Override
    public List<Resource> findByComment(Comment comment) {
        return resourceRepository.findByComment(comment);
    }
}