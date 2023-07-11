package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.Namirnica;

public interface NamirnicaRepository extends JpaRepository<Namirnica, Integer> {
}
