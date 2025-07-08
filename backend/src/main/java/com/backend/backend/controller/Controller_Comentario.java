package com.backend.backend.controller;

import com.backend.backend.model.Model_Comentario;
import com.backend.backend.service.Service_Comentario;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Comentario")
public class Controller_Comentario {
    private final Service_Comentario serviceComentario;

    public Controller_Comentario(Service_Comentario serviceComentario) {
        this.serviceComentario = serviceComentario;
    }

    //GET de comentarios
    @GetMapping
    public List<Model_Comentario> verTodos(){
        return serviceComentario.findAll();
    }

    @PostMapping
    public Model_Comentario crear(@RequestBody Model_Comentario modelComentario){
        return serviceComentario.crear(modelComentario);
    }

    @PutMapping("/{ID}")
    public Model_Comentario actualizar(@PathVariable Long id, @RequestBody Model_Comentario modelComentario) {
        return serviceComentario.actualizar(id, modelComentario);
    }

    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long ID) {
        serviceComentario.deleteById(ID);
    }

}



