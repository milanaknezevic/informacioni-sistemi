package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.NabavkaNamirnice;

import java.util.List;

public interface NabavkaNamirniceRepository extends JpaRepository<NabavkaNamirnice, Integer> {

    List<NabavkaNamirnice> findByIdNabavke(int id);
}
