package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ZaduzenjeDTO {
    private String naslov;
    private String opis;
    private LocalDateTime rokZaIzvrsenje;
    private Boolean status;
    private Integer idZaposlenog;

}
