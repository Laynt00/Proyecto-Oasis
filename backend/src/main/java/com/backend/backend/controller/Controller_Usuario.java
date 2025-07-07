package com.backend.backend.controller;


import com.backend.backend.model.Model_Usuario;
import com.backend.backend.service.Service_Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Usuario")
public class Controller_Usuario {
    private final Service_Usuario serviceUsuario;

    public Controller_Usuario(Service_Usuario serviceUsuario) {
        this.serviceUsuario = serviceUsuario;
    }

    //GET de usuario
    @GetMapping
    public List<Model_Usuario> verTodas() {
        return serviceUsuario.findAll();
    }

    //POST de usuario
    @PostMapping
    public Model_Usuario crear (@RequestBody Model_Usuario modelUsuario) {
        return serviceUsuario.crear(modelUsuario);
    }

    //PUT de usuario
    @PutMapping("/{ID}")
    public Model_Usuario actualizar(@PathVariable Long id, @RequestBody Model_Usuario modelUsuario) {
        return  serviceUsuario.actualizar(id, modelUsuario);
    }

    //DELETE de usuario
    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceUsuario.deleteById(id);
    }
}
