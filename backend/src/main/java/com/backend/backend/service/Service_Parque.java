package com.backend.backend.service;

import com.backend.backend.model.Parque;
import com.backend.backend.repository.Repository_Parque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Parque {

    @Autowired
    private Repository_Parque repositoryParque;

    public List<Parque> findAll() {
        return repositoryParque.findAll();
    }

    public Optional<Parque> findById(Long ID) {
        return repositoryParque.findById(ID);
    }

    public Parque crear(Parque parque) {
        return repositoryParque.save(parque);
    }

    public Parque actualizar(Long id, Parque parque) {
        return repositoryParque.save(parque);
    }

    public void deleteById(Long ID) {
        repositoryParque.deleteById(ID);
    }
}
