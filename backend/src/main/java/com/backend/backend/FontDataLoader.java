package com.backend.backend;

import com.backend.backend.model.Font;
import com.backend.backend.repository.FontRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class FontDataLoader implements CommandLineRunner {

    private final FontRepository fontRepository;
    private final ObjectMapper objectMapper;

    public FontDataLoader(FontRepository fontRepository, ObjectMapper objectMapper) {
        this.fontRepository = fontRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya hay fuentes en la base de datos para no cargar duplicados
        if (fontRepository.count() == 0) {
            List<Font> fonts = loadFontsFromJson();
            fontRepository.saveAll(fonts);
            System.out.println("Cargadas " + fonts.size() + " fuentes en la base de datos");
        }
    }

    private List<Font> loadFontsFromJson() {
        List<Font> fonts = new ArrayList<>();

        try {
            // Cargar el archivo JSON desde resources
            InputStream inputStream = new ClassPathResource("data/Fountains.json").getInputStream();
            JsonNode rootNode = objectMapper.readTree(inputStream);

            // Procesar cada feature del JSON
            JsonNode features = rootNode.path("features");
            for (JsonNode feature : features) {
                JsonNode properties = feature.path("properties");
                JsonNode geometry = feature.path("geometry");

                // Extraer los datos necesarios
                String name = properties.path("nombre").asText();
                JsonNode coordinates = geometry.path("coordinates");
                float coordX = (float) coordinates.get(0).asDouble();
                float coordY = (float) coordinates.get(1).asDouble();

                // Crear la fuente con valores por defecto para status y photo
                Font font = new Font(
                        name,
                        null,  // comment
                        coordX,
                        coordY,
                        "active",  // status por defecto
                        ""        // photo vacía por defecto
                );

                fonts.add(font);
            }
        } catch (Exception e) {
            System.err.println("Error al cargar fuentes desde JSON: " + e.getMessage());
            e.printStackTrace();
        }

        return fonts;
    }
}