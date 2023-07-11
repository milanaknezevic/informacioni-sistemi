package sarlota.entities.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sarlota.entities.dto.NamirnicaReceptDTO;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceptAddRequest {
    private String naslov;
    private String priprema;
    private String fotografija;
    private List<NamirnicaReceptDTO> namirnice;
}
