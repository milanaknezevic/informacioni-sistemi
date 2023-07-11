package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import sarlota.entities.enums.Role;

import java.math.BigDecimal;

@AllArgsConstructor
@Data
public class LoginResponse {
    private int id;
    private String token;
    private BigDecimal plata;
    private Role tipZaposlenog;
    private String ime;
    private String prezime;
    private String korisnickoIme;
    private String fotografija;
}
