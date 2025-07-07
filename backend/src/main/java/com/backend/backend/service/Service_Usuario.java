package com.backend.backend.service;

import com.backend.backend.model.Model_Usuario;
import com.backend.backend.repository.Repository_Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Usuario {
    @Autowired
    private final Repository_Usuario repositoryUsuario;

    public Service_Usuario(Repository_Usuario repositoryUsuario) {
        this.repositoryUsuario = repositoryUsuario;
    }

    public List<Model_Usuario> findAll() {
        return repositoryUsuario.findAll();
    }

    public Optional<Model_Usuario> findById(Long ID) {
        return repositoryUsuario.findById(ID);
    }

    public Model_Usuario crear(Model_Usuario usuario) {
        return repositoryUsuario.save(usuario);
    }

    public Model_Usuario actualizar(Long ID, Model_Usuario usuario) {
        usuario.setId(ID);
        return repositoryUsuario.save(usuario);
    }

    public void deleteById(Long ID) {
        repositoryUsuario.deleteById(ID);
    }
}
