package com.backend.backend.service;

import com.backend.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    User update(Long id, User user);
    void delete(Long id);
    boolean existsByEmail(String email);
    User findByEmail(String email);
}