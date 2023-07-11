package sarlota.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Recept {
    @Basic@Column(name = "priprema")
    private String priprema;
    @Basic@Column(name = "naslov")
    private String naslov;
    @Column (name = "fotografija")
    private String fotografija;
    @Column (name = "omiljeni")
    private Boolean omiljeni = false;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id@Column(name = "id")
    private Integer id;
    @Column (name = "aktivan")
    private Boolean aktivan = true;
}
