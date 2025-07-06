package com.backend.backend.service;

import com.backend.backend.model.Model_Banco;
import com.backend.backend.repository.Repository_Banco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Banco {

    @Autowired
    private Repository_Banco repositoryBanco;

    public List<Model_Banco> findAll() {//Para ver los datos disponibles
        return repositoryBanco.findAll();
    }

    public Optional<Model_Banco> findById(Long ID) {
        return repositoryBanco.findById(ID);
    }

    public Model_Banco save(Model_Banco banco) {
        return repositoryBanco.save(banco);
    }

    public void deleteById(Long ID) {
        repositoryBanco.deleteById(ID);
    }
}
