package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sarlota.entities.Namirnica;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NamirnicaUReceptuDTO {
    private Namirnica namirnica;
    private double kolicina;
    private double cijena;
}
