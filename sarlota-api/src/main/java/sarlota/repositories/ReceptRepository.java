package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sarlota.entities.Recept;
import sarlota.entities.Zaposleni;

import java.util.List;

public interface ReceptRepository extends JpaRepository<Recept, Integer> {
    @Query(value = "SELECT r FROM Recept r WHERE (r.naslov LIKE ?1 OR r.priprema LIKE ?1)")
    List<Recept> findByKeyword(String keyword);

    @Query(value = "SELECT r FROM Recept r WHERE r.aktivan = true")
    List<Recept> findAll();
}
