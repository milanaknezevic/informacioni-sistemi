package sarlota.entities.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KontaktDTO {
    private String ime;
    private String prezime;
    private String brojTelefona;
    private String linkProfila;
    private String email;
}
