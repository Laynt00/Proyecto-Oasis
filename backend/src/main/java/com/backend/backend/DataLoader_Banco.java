package com.backend.backend;

import com.backend.backend.model.Banco;
import com.backend.backend.repository.Repository_Banco;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader_Banco implements CommandLineRunner {

    private final Repository_Banco repo;
    private final ObjectMapper objectMapper;

    public DataLoader_Banco(Repository_Banco repo) {
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

        List<Banco> bancos = new ArrayList<>();

        for (JsonNode feature : features) {
            //long id = feature.get("properties").get("ogc_fid").asLong();
            String nombre = feature.get("properties").get("nombre").asText();
            JsonNode coords = feature.get("geometry").get("coordinates");
            double x = coords.get(0).asDouble();
            double y = coords.get(1).asDouble();

            bancos.add(new Banco(nombre, x, y));
        }

        repo.saveAll(bancos);
    }
}
