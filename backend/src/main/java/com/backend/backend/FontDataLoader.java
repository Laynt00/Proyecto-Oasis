package com.backend.backend;

import com.backend.backend.model.User;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.FontRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
@Order(3) // Orden de ejecución después de User y Comment
public class FontDataLoader implements CommandLineRunner {

    private final FontRepository fontRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public FontDataLoader(FontRepository fontRepository,
                          CommentRepository commentRepository,
                          UserRepository userRepository) {
        this.fontRepository = fontRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Solo cargar datos si no existen fuentes
        if (fontRepository.count() == 0) {
            // Obtener o crear usuario técnico
            User techUser = userRepository.findByEmail("tech@example.com")
                    .orElseGet(() -> userRepository.save(
                            new User("Usuario Técnico", "tech@example.com", false)
                    ));

            // Crear comentarios para las fuentes
            Comment comment1 = commentRepository.save(
                    new Comment(techUser, "Fuente con buen caudal pero necesita mantenimiento")
            );

            Comment comment2 = commentRepository.save(
                    new Comment(techUser, "Fuente decorativa en perfecto estado")
            );

            // Crear datos iniciales de fuentes
            fontRepository.saveAll(Arrays.asList(
                    new Font(
                            "Fuente Principal",
                            "40.4189,-3.6919", // Coordenadas Plaza Mayor, Madrid
                            comment1,
                            "Buen estado",
                            "fuente_principal.jpg"
                    ),
                    new Font(
                            "Fuente de los Delfines",
                            "40.4198,-3.6935", // Coordenadas cercanas
                            comment2,
                            "Excelente",
                            "fuente_delfines.jpg"
                    ),
                    new Font(
                            "Fuente del Parque Este",
                            "40.4215,-3.6812",
                            null, // Sin comentario
                            "Regular",
                            "fuente_parque.jpg"
                    ),
                    new Font(
                            "Fuente Moderna",
                            "40.4156,-3.7003",
                            null,
                            "Nueva",
                            "fuente_moderna.jpg"
                    )
            ));

            System.out.println("✅ Datos iniciales de Font cargados correctamente");
        }
    }
}