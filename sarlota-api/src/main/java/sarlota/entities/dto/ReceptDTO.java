package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sarlota.entities.Recept;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceptDTO {
    private Recept recept;
//    private String priprema;
//    private String sastojci;
//    private String naslov;
//    private String fotografija;
//    private Boolean omiljeni;
    private List<NamirnicaUReceptuDTO> namirnice;
    private double trosakIzrade;
}
