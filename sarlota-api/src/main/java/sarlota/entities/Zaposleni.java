package sarlota.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import sarlota.entities.enums.Role;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Zaposleni {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "ime")
    private String ime;
    @Basic
    @Column(name = "prezime")
    private String prezime;
    @Basic
    @Column(name = "korisnicko_ime")
    private String korisnickoIme;
    @Basic
    @Column(name = "lozinka")
    @JsonIgnore
    private String lozinka;
    @Basic
    @Column(name = "plata")
    private BigDecimal plata;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "tip_zaposlenog", nullable = false)
    private Role tipZaposlenog;
    @Lob
    @Column (name = "fotografija")
    private String fotografija;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Zaduzenje> zaduzenjesById;


    public Zaposleni(Integer id, String username, String firstName, String lastName, String password, BigDecimal plata, Role tipZaposlenog, String fotografija) {
        this.id = id;
        this.korisnickoIme = username;
        this.ime = firstName;
        this.prezime = lastName;
        this.plata = plata;
        this.tipZaposlenog = tipZaposlenog;
        this.lozinka = password;
        this.fotografija = fotografija;
    }

    public Zaposleni(Integer id, String korisnickoIme, Object o, Role tipZaposlenog) {
        this.id = id;
        this.korisnickoIme = korisnickoIme;
        this.tipZaposlenog = tipZaposlenog;
    }
}
