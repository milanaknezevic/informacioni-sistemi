package sarlota.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "nabavka_namirnice")
@NoArgsConstructor
@AllArgsConstructor
public class NabavkaNamirnice {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "nabavka_id")
    private Integer idNabavke;
    @Basic
    @Column(name = "namirnica_id")
    private Integer idNamirnice;
    @Basic
    @Column(name = "kolicina")
    private double kolicina;
}
