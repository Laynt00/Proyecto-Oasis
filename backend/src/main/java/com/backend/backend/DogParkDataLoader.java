import com.backend.backend.model.Comment;
import com.backend.backend.model.User;
import com.backend.backend.repository.CommentRepository;
import com.backend.backend.repository.DogParkRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class DogParkDataLoader implements CommandLineRunner {

    private final DogParkRepository dogParkRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public DogParkDataLoader(DogParkRepository dogParkRepository,
                             CommentRepository commentRepository,
                             UserRepository userRepository) {
        this.dogParkRepository = dogParkRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (dogParkRepository.count() == 0) {
            // Usuario admin con Optional
            User admin = userRepository.findByEmail("admin@example.com")
                    .orElseGet(() -> userRepository.save(
                            new User("Admin", "admin@example.com", true)
                    ));

            // Crear comentarios
            Comment comment1 = commentRepository.save(
                    new Comment(admin, "Excelente parque para perros grandes")
            );
            Comment comment2 = commentRepository.save(
                    new Comment(admin, "Tiene áreas separadas para perros pequeños y grandes")
            );

            System.out.println("Datos iniciales de DogPark cargados exitosamente");
        }
    }
}