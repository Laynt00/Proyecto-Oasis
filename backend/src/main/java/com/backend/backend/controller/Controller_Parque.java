package com.backend.backend.controller;


import com.backend.backend.model.Parque;
import com.backend.backend.service.Service_Parque;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/Parque")
public class Controller_Parque {
    private final Service_Parque serviceParque;

    public Controller_Parque(Service_Parque serviceParque) {
        this.serviceParque = serviceParque;
    }

    //GET de parques
    @GetMapping
    public List<Parque> verTodos() {
        return serviceParque.findAll();
    }

    //POST de parques
    @PostMapping
    public Parque crear(@RequestBody Parque parque) {
        return serviceParque.crear(parque);
    }

    //PUT de parques
    @PutMapping("/{ID}")
    public Parque actualizar(@PathVariable Long id, @RequestBody Parque parque) {
        return serviceParque.actualizar(id, parque);
    }

    //DELETE de parques
    @DeleteMapping("/{ID}")
    public void eliminar(@PathVariable Long id) {
        serviceParque.deleteById(id);
    }
}
