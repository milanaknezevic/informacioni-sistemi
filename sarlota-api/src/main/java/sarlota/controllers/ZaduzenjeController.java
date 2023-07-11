package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Kontakt;
import sarlota.entities.Zaduzenje;
import sarlota.entities.dto.KontaktDTO;
import sarlota.entities.dto.ZaduzenjeDTO;
import sarlota.services.KontaktService;
import sarlota.services.ZaduzenjeService;

import java.util.List;

@RestController
@RequestMapping("api/v1/zaduzenja")
@RequiredArgsConstructor
public class ZaduzenjeController {
    private final ZaduzenjeService zaduzenjeService;

    @GetMapping
    public ResponseEntity<List<Zaduzenje>> getAll() {
        return ResponseEntity.ok(zaduzenjeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zaduzenje> getOne(@PathVariable int id) {
        Zaduzenje zaduzenje = zaduzenjeService.getOne(id);
        return zaduzenje == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(zaduzenje);
    }

    @PostMapping
    public ResponseEntity<Zaduzenje> add(@RequestBody ZaduzenjeDTO zaduzenjeDTO) {
        try {
            Zaduzenje zaduzenje = zaduzenjeService.add(zaduzenjeDTO);
            return zaduzenje == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(zaduzenje);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Zaduzenje> update(@PathVariable int id, @RequestBody ZaduzenjeDTO zaduzenjeDTO) {
        try {
            Zaduzenje zaduzenje = zaduzenjeService.update(id, zaduzenjeDTO);
            return zaduzenje == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(zaduzenje);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            zaduzenjeService.delete(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
