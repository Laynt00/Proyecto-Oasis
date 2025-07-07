package com.backend.backend.controller;


import com.backend.backend.model.Model_Fuente;
import com.backend.backend.service.Service_Fuente;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Fuente")
public class Controller_Fuente {
    private final Service_Fuente serviceFuente;

    public Controller_Fuente(Service_Fuente serviceFuente) {
        this.serviceFuente = serviceFuente;
    }

    //GET de fuentes
    @GetMapping
    public List<Model_Fuente> verTodas() {
        return serviceFuente.findAll();
    }

    //POST de fuentes
    @PostMapping
    public Model_Fuente crear (@RequestBody Model_Fuente modelFuente) {
        return serviceFuente.crear(modelFuente);
    }

    //PUT de fuentes
    @PutMapping("/{ID}")
    public Model_Fuente actualizar(@PathVariable Long id, @RequestBody Model_Fuente modelFuente) {
        return  serviceFuente.actualizar(id, modelFuente);
    }

    //DELETE de fuentes
    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceFuente.deleteById(id);
    }

}
