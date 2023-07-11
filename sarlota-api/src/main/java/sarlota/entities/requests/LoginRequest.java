package sarlota.entities.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    private String korisnickoIme;
    private String lozinka;
}
