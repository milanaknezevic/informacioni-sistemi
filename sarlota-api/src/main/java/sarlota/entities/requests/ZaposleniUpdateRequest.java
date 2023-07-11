package sarlota.entities.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import sarlota.entities.enums.Role;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ZaposleniUpdateRequest {

    private String korisnickoIme;
    private String ime;
    private String prezime;
    private BigDecimal plata;
    private Role tipZaposlenog;
    private String fotografija;

}
