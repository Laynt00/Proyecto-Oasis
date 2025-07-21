package com.backend.backend.util;

import com.backend.backend.model.DogPark;
import com.backend.backend.model.ResourceType;
import com.backend.backend.repository.DogParkRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DogParkDataLoader implements CommandLineRunner {

    private final DogParkRepository dogParkRepository;
    private final ObjectMapper objectMapper;

    public DogParkDataLoader(DogParkRepository dogParkRepository, ObjectMapper objectMapper) {
        this.dogParkRepository = dogParkRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya hay parques en la base de datos para no cargar duplicados
        if (dogParkRepository.count() == 0) {
            List<DogPark> dogParks = loadDogParksFromJson();
            dogParkRepository.saveAll(dogParks);
            System.out.println("Cargados " + dogParks.size() + " parques caninos en la base de datos");
        }
    }

    private List<DogPark> loadDogParksFromJson() {
        List<DogPark> dogParks = new ArrayList<>();

        try {
            // Cargar el archivo JSON desde resources
            InputStream inputStream = new ClassPathResource("data/DogParks.json").getInputStream();
            JsonNode rootNode = objectMapper.readTree(inputStream);

            // Procesar cada feature del JSON
            JsonNode features = rootNode.path("features");
            for (JsonNode feature : features) {
                JsonNode properties = feature.path("properties");
                JsonNode geometry = feature.path("geometry");

                // Extraer los datos necesarios
                String name = properties.path("NOMBRE").asText();
                JsonNode coordinates = geometry.path("coordinates");
                float coordX = (float) coordinates.get(0).asDouble();
                float coordY = (float) coordinates.get(1).asDouble();

                // Crear el parque canino con valores por defecto
                DogPark dogPark = new DogPark(
                        name,
                        null,  // comment
                        coordX,
                        coordY,
                        "",        // photo vacía por defecto
                        ResourceType.DOG_PARK
                );

                dogParks.add(dogPark);
            }
        } catch (Exception e) {
            System.err.println("Error al cargar parques caninos desde JSON: " + e.getMessage());
            e.printStackTrace();
        }

        return dogParks;
    }
}