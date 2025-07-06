package com.backend.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Banco")
public class Controller_Banco {
    @GetMapping
    public List<Banco> getAllBancos() {
        return
    }
}
