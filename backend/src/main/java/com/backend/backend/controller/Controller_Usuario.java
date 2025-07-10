package com.backend.backend.controller;


import com.backend.backend.model.Usuario;
import com.backend.backend.service.Service_Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class Controller_Usuario {
    private final Service_Usuario serviceUsuario;

    public Controller_Usuario(Service_Usuario serviceUsuario) {
        this.serviceUsuario = serviceUsuario;
    }

    //GET de usuario
    @GetMapping
    public List<Usuario> verTodas() {
        return serviceUsuario.findAll();
    }

    //POST de usuario
    @PostMapping
    public Usuario crear (@RequestBody Usuario usuario) {
        return serviceUsuario.crear(usuario);
    }

    //PUT de usuario
    @PutMapping("/{ID}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return  serviceUsuario.actualizar(id, usuario);
    }

    //DELETE de usuario
    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceUsuario.deleteById(id);
    }
}
