package com.backend.backend.service;

import com.backend.backend.model.Banco;
import com.backend.backend.repository.Repository_Banco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Banco {

    @Autowired
    private Repository_Banco repositoryBanco;

    public List<Banco> findAll() {//Para ver los datos disponibles
        return repositoryBanco.findAll();
    }

    public Optional<Banco> findById(Long ID) {
        return repositoryBanco.findById(ID);
    }

    public Banco crear(Banco banco) {
        return repositoryBanco.save(banco);
    }

    public Banco actualizar(Long id, Banco banco) {
        return repositoryBanco.save(banco);
    }

    public void deleteById(Long ID) {
        repositoryBanco.deleteById(ID);
    }
}
