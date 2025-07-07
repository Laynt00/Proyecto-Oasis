package com.backend.backend.controller;


import com.backend.backend.model.Model_Fuente;
import com.backend.backend.model.Model_Parque;
import com.backend.backend.service.Service_Parque;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Parque")
public class Controller_Parque {
    private final Service_Parque serviceParque;

    public Controller_Parque(Service_Parque serviceParque) {
        this.serviceParque = serviceParque;
    }

    //GET de parques
    @GetMapping
    public List<Model_Parque> verTodos() {
        return serviceParque.findAll();
    }

    //POST de parques
    @PostMapping
    public Model_Parque crear(@RequestBody Model_Parque modelParque) {
        return serviceParque.crear(modelParque);
    }

    //PUT de parques
    @PutMapping("/{ID}")
    public Model_Parque actualizar(@PathVariable Long id, @RequestBody Model_Parque modelParque) {
        return serviceParque.actualizar(id, modelParque);
    }

    //DELETE de parques
    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceParque.deleteById(id);
    }
}
