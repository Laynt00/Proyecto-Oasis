package com.backend.backend.controller;

import com.backend.backend.model.Comentario;
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
    public List<Comentario> verTodos(){
        return serviceComentario.findAll();
    }

    @PostMapping
    public Comentario crear(@RequestBody Comentario comentario){
        return serviceComentario.crear(comentario);
    }

    @PutMapping("/{ID}")
    public Comentario actualizar(@PathVariable Long id, @RequestBody Comentario comentario) {
        return serviceComentario.actualizar(id, comentario);
    }

    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long ID) {
        serviceComentario.deleteById(ID);
    }

}



