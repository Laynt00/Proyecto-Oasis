package com.backend.backend.service;

import com.backend.backend.model.Model_Parque;
import com.backend.backend.repository.Repository_Parque;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class Service_Parque {

    @Autowired
    private Repository_Parque repositoryParque;

    public List<Model_Parque> findAll() {
        return repositoryParque.findAll();
    }

    public Optional<Model_Parque> findById(Long ID) {
        return repositoryParque.findById(ID);
    }

    public Model_Parque crear(Model_Parque parque) {
        return repositoryParque.save(parque);
    }

    public Model_Parque actualizar(Long id, Model_Parque parque) {
        return repositoryParque.save(parque);
    }

    public void deleteById(Long ID) {
        repositoryParque.deleteById(ID);
    }
}
