package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Namirnica;
import sarlota.entities.dto.NamirnicaDTO;
import sarlota.services.NamirnicaService;

import java.util.List;

@RestController
@RequestMapping("api/v1/namirnice")
@RequiredArgsConstructor
public class NamirnicaController {
    private final NamirnicaService namirnicaService;

    @GetMapping
    public ResponseEntity<List<Namirnica>> getAll() {
        return ResponseEntity.ok(namirnicaService.getAll());
    }

    @PostMapping
    public ResponseEntity<Namirnica> add(@RequestBody NamirnicaDTO namirnica) {
        try {
            Namirnica n = namirnicaService.add(namirnica);
            return n == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(n);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
