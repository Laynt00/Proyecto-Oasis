package com.backend.backend;

import com.backend.backend.model.Parque;
import com.backend.backend.repository.Repository_Parque;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader_Parque implements CommandLineRunner {

    private final Repository_Parque repo;
    private final ObjectMapper objectMapper;

    public DataLoader_Parque(Repository_Parque repo) {
        this.repo = repo;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() > 0){
            return;
        }
        InputStream is = getClass().getResourceAsStream("/Fuentes.json");
        JsonNode root = objectMapper.readTree(is);
        JsonNode features = root.get("features");

        List<Parque> parques = new ArrayList<>();

        for (JsonNode feature : features) {
            //long id = feature.get("properties").get("ogc_fid").asLong();
            String nombre = feature.get("properties").get("nombre").asText();
            JsonNode coords = feature.get("geometry").get("coordinates");
            double x = coords.get(0).asDouble();
            double y = coords.get(1).asDouble();

            parques.add(new Parque(nombre, x, y));
        }

        repo.saveAll(parques);
    }
}
