package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class Potrosnja {
    LocalDate datum;
    double potrosnja;
}
