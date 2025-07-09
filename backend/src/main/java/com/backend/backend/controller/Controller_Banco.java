package com.backend.backend.controller;


import com.backend.backend.model.Banco;
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
    public List<Banco> getAllBancos() {
        return serviceBanco.findAll();
    }

    //POST de bancos
    @PostMapping
    public Banco crear (@RequestBody Banco banco) {
        return serviceBanco.crear(banco);
    }

    //PUT de bancos
    @PutMapping("/{ID}")
    public Banco actualizar(@PathVariable Long id, @RequestBody Banco banco) {
        return serviceBanco.actualizar(id, banco);
    }

    //DELETE de bancos
    @DeleteMapping ("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceBanco.deleteById(id);
    }
}
