package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.Ponuda;

public interface PonudaRepository extends JpaRepository<Ponuda, Integer> {
}
