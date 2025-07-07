package com.backend.backend.service;

import com.backend.backend.model.Model_Fuente;
import com.backend.backend.repository.Repository_Fuente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Fuente {

    @Autowired
    private Repository_Fuente repositoryFuente;

    public List<Model_Fuente> findAll() {
        return repositoryFuente.findAll();
    }

    public Optional<Model_Fuente> findById(Long ID) {
        return repositoryFuente.findById(ID);
    }

    public Model_Fuente crear(Model_Fuente fuente) { return repositoryFuente.save(fuente);}

    public Model_Fuente actualizar(Long id, Model_Fuente fuente) {
        return repositoryFuente.save(fuente);
    }

    public void deleteById(Long ID) {
        repositoryFuente.deleteById(ID);
    }
}