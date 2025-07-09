package com.backend.backend.service;

import com.backend.backend.model.Fuente;
import com.backend.backend.repository.Repository_Fuente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Fuente {

    @Autowired
    private Repository_Fuente repositoryFuente;

    public List<Fuente> findAll() {
        return repositoryFuente.findAll();
    }

    public Optional<Fuente> findById(Long ID) {
        return repositoryFuente.findById(ID);
    }

    public Fuente crear(Fuente fuente) { return repositoryFuente.save(fuente);}

    public Fuente actualizar(Long id, Fuente fuente) {
        return repositoryFuente.save(fuente);
    }

    public void deleteById(Long ID) {
        repositoryFuente.deleteById(ID);
    }
}