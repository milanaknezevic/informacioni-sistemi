package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GrupisaneNarudzbeDto {
    private String category;
    private Integer value;
    private Double cijena;
}
