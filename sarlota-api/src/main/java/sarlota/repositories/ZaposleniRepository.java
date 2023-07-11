package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sarlota.entities.Kontakt;
import sarlota.entities.Zaposleni;

import java.util.List;

public interface ZaposleniRepository extends JpaRepository<Zaposleni, Integer> {
    @Query(value = "SELECT  z FROM Zaposleni z WHERE z.korisnickoIme = ?1")
    Zaposleni findByUsername(String username);

    @Query(value = "SELECT z FROM Zaposleni z WHERE (z.ime LIKE ?1 OR z.prezime LIKE ?1 OR z.korisnickoIme LIKE ?1)")
    List<Zaposleni> findByKeyword(String keyword);

}
