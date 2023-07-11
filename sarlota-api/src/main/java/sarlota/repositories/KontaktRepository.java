package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sarlota.entities.Kontakt;
import sarlota.entities.Zaposleni;

import java.util.List;

public interface KontaktRepository extends JpaRepository<Kontakt, Integer> {

    @Query(value = "SELECT k FROM Kontakt k WHERE (k.ime LIKE ?1 OR k.prezime LIKE ?1 OR k.brojTelefona LIKE ?1 OR k.linkProfila LIKE ?1 OR k.email LIKE ?1)")
    List<Kontakt> findByKeyword(String keyword);
}
