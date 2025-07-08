package com.backend.backend;

import com.backend.backend.model.Model_Fuente;
import com.backend.backend.repository.Repository_Fuente;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final Repository_Fuente repo;
    private final ObjectMapper objectMapper;

    public DataLoader(Repository_Fuente repo) {
        this.repo = repo;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public void run(String... args) throws Exception {
        InputStream is = getClass().getResourceAsStream("/fuentes.json");
        JsonNode root = objectMapper.readTree(is);
        JsonNode features = root.get("features");

        List<Model_Fuente> fuentes = new ArrayList<>();

        for (JsonNode feature : features) {
            //long id = feature.get("properties").get("ogc_fid").asLong();
            String nombre = feature.get("properties").get("nombre").asText();
            JsonNode coords = feature.get("geometry").get("coordinates");
            double x = coords.get(0).asDouble();
            double y = coords.get(1).asDouble();

            fuentes.add(new Model_Fuente(nombre, x, y));
        }

        repo.saveAll(fuentes);
    }
}
