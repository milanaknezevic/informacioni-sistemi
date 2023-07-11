package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PotrosnjaNarudzbeDTO {
    private String category;
    private double value;

    private Integer kolicina;
}
