package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NabavkaDTO {
    private Integer id;
    private LocalDateTime datum;
    private double cijena;
    private List<NabavljenaNamirnicaDTO> namirnice;
}
