package com.backend.backend.service;

import com.backend.backend.model.Model_Parque;
import com.backend.backend.model.Model_Usuario;
import com.backend.backend.repository.Repository_Usuario;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class Service_Usuario {
    @Autowired
    private Repository_Usuario repositoryUsuario;

    public List<Model_Usuario> findAll() {
        return repositoryUsuario.findAll();
    }

    public Optional<Model_Usuario> findById(Long ID) {
        return repositoryUsuario.findById(ID);
    }

    public Model_Usuario crear(Model_Usuario usuario) {
        return repositoryUsuario.save(usuario);
    }

    public Model_Usuario actualizar(Long id, Model_Usuario usuario) {
        return repositoryUsuario.save(usuario);
    }

    public void deleteById(Long ID) {
        repositoryUsuario.deleteById(ID);
    }
}
