package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NamirnicaDTO {
    private String naziv;
    private double cijenaPoJedinici;
    private String jedinica;
}
