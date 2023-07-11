package sarlota.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Proizvod {
    @Basic@Column(name = "kolicina")
    private Integer kolicina;
    @Id@Column(name = "id")
    private Integer id;
    @ManyToOne@JoinColumn(name = "narudzba_id", referencedColumnName = "id", nullable = false)
    private Narudzba narudzbaByNarudzbaId;
    @ManyToOne@JoinColumn(name = "ponuda_id", referencedColumnName = "id", nullable = false)
    private Ponuda ponudaByPonudaId;

}
