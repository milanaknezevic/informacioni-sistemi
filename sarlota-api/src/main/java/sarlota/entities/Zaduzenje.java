package sarlota.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Zaduzenje {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id@Column(name = "id")
    private Integer id;
    @Basic@Column(name = "naslov")
    private String naslov;
    @Basic@Column(name = "opis")
    private String opis;
    @Basic@Column(name = "rok_za_izvrsenje")
    private LocalDateTime rokZaIzvrsenje;
    @Basic@Column(name = "status")
    private Boolean status;
    @ManyToOne@JoinColumn(name = "zaposleni_id", referencedColumnName = "id", nullable = false)
    private Zaposleni zaposleniByZaposleniId;

}
