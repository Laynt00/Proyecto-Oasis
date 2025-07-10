package com.backend.backend.controller;


import com.backend.backend.model.Fuente;
import com.backend.backend.service.Service_Fuente;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller_Fuente {
    private final Service_Fuente serviceFuente;

    public Controller_Fuente(Service_Fuente serviceFuente) {
        this.serviceFuente = serviceFuente;
    }

    //GET de fuentes
    @GetMapping("fuente")
    public List<Fuente> verTodas() {
        return serviceFuente.findAll();
    }

    //POST de fuentes
    @PostMapping("fuente")
    public Fuente crear (@RequestBody Fuente fuente) {
        return serviceFuente.crear(fuente);
    }

    //PUT de fuentes
    @PutMapping("fuente/{id}")
    public Fuente actualizar(@PathVariable Long id, @RequestBody Fuente fuente) {
        return  serviceFuente.actualizar(id, fuente);
    }

    //DELETE de fuentes
    @DeleteMapping("fuente/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceFuente.deleteById(id);
    }

}
