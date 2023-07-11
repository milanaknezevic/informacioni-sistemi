package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.Kontakt;
import sarlota.entities.Zaduzenje;

public interface ZaduzenjeRepository extends JpaRepository<Zaduzenje, Integer> {
}
