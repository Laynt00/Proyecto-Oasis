package com.backend.backend.service;


import com.backend.backend.model.Model_Comentario;
import com.backend.backend.model.Model_Fuente;
import com.backend.backend.repository.Repository_Banco;
import com.backend.backend.repository.Repository_Comentario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Comentario {

    @Autowired
    private Repository_Comentario repositoryComentario;

    public List<Model_Comentario> findAll(){
        return repositoryComentario.findAll();
    }

    public Optional<Model_Comentario> findById(Long ID) {
        return repositoryComentario.findById(ID);
    }

    public Model_Comentario crear(Model_Comentario comentario){
        return repositoryComentario.save(comentario);
    }

    public Model_Comentario actualizar(Long id, Model_Comentario comentario){
        return repositoryComentario.save(comentario);
    }

    public void deleteById(Long ID) {
        repositoryComentario.deleteById(ID);
    }
}
