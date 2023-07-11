package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class Zarada {
    LocalDate datum;
    Double zarada;
}
