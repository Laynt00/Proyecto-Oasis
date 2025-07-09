package com.backend.backend.service;


import com.backend.backend.model.Comentario;
import com.backend.backend.repository.Repository_Comentario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Service_Comentario {

    @Autowired
    private Repository_Comentario repositoryComentario;

    public List<Comentario> findAll(){
        return repositoryComentario.findAll();
    }

    public Optional<Comentario> findById(Long ID) {
        return repositoryComentario.findById(ID);
    }

    public Comentario crear(Comentario comentario){
        return repositoryComentario.save(comentario);
    }

    public Comentario actualizar(Long id, Comentario comentario){
        return repositoryComentario.save(comentario);
    }

    public void deleteById(Long ID) {
        repositoryComentario.deleteById(ID);
    }
}
