package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sarlota.entities.Narudzba;

import java.time.LocalDateTime;
import java.util.List;

public interface NarudzbaRepository extends JpaRepository<Narudzba, Integer> {

    @Query(value = "SELECT n FROM Narudzba n WHERE n.datumIsporuke > ?1 AND n.datumIsporuke < ?2")
    List<Narudzba> findByDatumIsporuke(LocalDateTime start, LocalDateTime end);

    @Query(value = "SELECT n FROM Narudzba n WHERE n.datumPrijema > ?1 AND n.datumPrijema < ?2")
    List<Narudzba> findByDatumPrijema(LocalDateTime start, LocalDateTime end);

    @Query("SELECT n FROM Narudzba n WHERE n.imeNarucioca LIKE %:keyword%")
    List<Narudzba> findByKeyword(@Param("keyword") String keyword);


}
