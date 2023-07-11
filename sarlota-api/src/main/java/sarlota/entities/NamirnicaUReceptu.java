package sarlota.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "namirnica_u_receptu")
@NoArgsConstructor
@AllArgsConstructor
public class NamirnicaUReceptu {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "recept_id")
    private Integer idRecepta;
    @Basic
    @Column(name = "namirnica_id")
    private Integer idNamirnice;
    @Basic
    @Column(name = "kolicina")
    private double kolicina;
}
