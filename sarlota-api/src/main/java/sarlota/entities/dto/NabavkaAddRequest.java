package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NabavkaAddRequest {
    private LocalDateTime datum;
    private List<NabavkaNamirniceDTO> namirnice;
}
