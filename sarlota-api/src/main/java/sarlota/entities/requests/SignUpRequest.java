package sarlota.entities.requests;


import lombok.Data;
import sarlota.entities.enums.Role;

@Data
public class SignUpRequest {
    private String korisnickoIme;
    private String ime;
    private String prezime;
    private String lozinka;
    private Role tipZaposlenog;
    private String fotografija;
}
