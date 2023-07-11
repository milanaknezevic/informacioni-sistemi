package sarlota.entities.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sarlota.entities.Proizvod;
import sarlota.entities.Zaposleni;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NarudzbaDTO {
    private Integer id;
    private LocalDateTime datumPrijema;
    private LocalDateTime datumIsporuke;
    private Boolean aktivna;
    private Integer brojKomada;
    private String naziv;
    private String napomene;
    private String slika;
    private String kontakt;
    private String adresa;
    private String imeNarucioca;
    private String velicina;
    private Double cijena;
    private String nazivRecepta;

}
