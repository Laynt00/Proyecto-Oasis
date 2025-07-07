package com.backend.backend.controller;


import com.backend.backend.model.Model_Banco;
import com.backend.backend.service.Service_Banco;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Banco")
public class Controller_Banco {
    private final Service_Banco serviceBanco;

    public Controller_Banco(Service_Banco serviceBanco) {
        this.serviceBanco = serviceBanco;
    }

    //GET de bancos (de sentarse)
    @GetMapping
    public List<Model_Banco> getAllBancos() {
        return serviceBanco.findAll();
    }

    //POST de bancos
    @PostMapping
    public Model_Banco crear (@RequestBody Model_Banco modelBanco) {
        return serviceBanco.crear(modelBanco);
    }

    //PUT de bancos
    @PutMapping("/{ID}")
    public Model_Banco actualizar(@PathVariable Long id, @RequestBody Model_Banco modelBanco) {
        return serviceBanco.actualizar(id, modelBanco);
    }

    //DELETE de bancos
    @DeleteMapping ("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceBanco.deleteById(id);
    }
}
