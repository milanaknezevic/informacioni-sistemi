package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sarlota.entities.Namirnica;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NabavljenaNamirnicaDTO {
    private Namirnica namirnica;
    private double cijena;
    private double kolicina;
}
