package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.NamirnicaUReceptu;

import java.util.List;

public interface NamirnicaUReceptuRepository extends JpaRepository<NamirnicaUReceptu, Integer> {
    List<NamirnicaUReceptu> findByIdRecepta(int id);
}
