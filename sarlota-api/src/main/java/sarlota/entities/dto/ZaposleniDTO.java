package sarlota.entities.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sarlota.entities.enums.Role;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ZaposleniDTO {
    private String ime;
    private String prezime;
    private String korisnickoIme;
    private String lozinka;
    private BigDecimal plata;
    private Role tipZaposlenog;
    private String fotografija;
}