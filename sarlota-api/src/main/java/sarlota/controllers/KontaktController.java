package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Kontakt;
import sarlota.entities.dto.KontaktDTO;
import sarlota.services.KontaktService;

import java.util.List;

@RestController
@RequestMapping("api/v1/kontakti")
@RequiredArgsConstructor
public class KontaktController {
    private final KontaktService kontaktService;

    @GetMapping("/search")
    ResponseEntity<List<Kontakt>> search(@RequestParam(value = "query") String keyword) {
        if(keyword.length() == 0) return ResponseEntity.ok(kontaktService.getAll());
        else return ResponseEntity.ok(kontaktService.search(keyword));
    }

    @GetMapping
    public ResponseEntity<List<Kontakt>> getAll() {
        return ResponseEntity.ok(kontaktService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kontakt> getOne(@PathVariable int id) {
        Kontakt k = kontaktService.getOne(id);
        return k == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(k);
    }

    @PostMapping
    public ResponseEntity<Kontakt> add(@RequestBody KontaktDTO kontaktDTO) {
        try {
            Kontakt k = kontaktService.add(kontaktDTO);
            return k == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(k);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kontakt> update(@PathVariable int id, @RequestBody KontaktDTO kontaktDTO) {
        try {
            Kontakt k = kontaktService.update(id, kontaktDTO);
            return k == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(k);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            kontaktService.delete(id);
            return ResponseEntity.ok().build();
        }
         catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
         }
    }
}
