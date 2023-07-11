package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.TokenResponse;
import sarlota.entities.dto.ZaposleniDTO;
import sarlota.entities.requests.ZaposleniUpdateRequest;
import sarlota.entities.requests.ZaposleniUpdateZaposleniRequest;
import sarlota.services.AuthService;
import sarlota.services.ZaposleniService;
import java.util.List;

@RestController
@RequestMapping("api/v1/zaposleni")
@RequiredArgsConstructor
public class ZaposleniController {
    private final ZaposleniService zaposleniService;

    private final AuthService authService;

    @PutMapping("/{id}/edit")
    public ResponseEntity<Zaposleni> edit(@PathVariable int id, @RequestBody ZaposleniUpdateZaposleniRequest request){
        try {
            Zaposleni z = authService.edit(id, request);
            return z == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(z);
        }
        catch (Exception e) {
            return ResponseEntity.status((HttpStatus.NOT_FOUND)).build();
        }
    }


    @GetMapping("/search")
    ResponseEntity<List<Zaposleni>> search(@RequestParam(value = "query") String keyword) {
        if(keyword.length() == 0) return ResponseEntity.ok(zaposleniService.getAll());
        else return ResponseEntity.ok(zaposleniService.search(keyword));
    }


    @GetMapping
    public ResponseEntity<List<Zaposleni>> getAll() {
        return ResponseEntity.ok(zaposleniService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zaposleni> getOne(@PathVariable int id) {
        Zaposleni z = zaposleniService.getOne(id);
        return z == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(z);
    }

    @PostMapping
    public ResponseEntity<Zaposleni> add(@RequestBody ZaposleniDTO zaposleniDTO) {
        try {
            Zaposleni z = zaposleniService.add(zaposleniDTO);
            return z == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(z);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Zaposleni> update(@PathVariable int id, @RequestBody ZaposleniUpdateRequest request) {
        try {
            Zaposleni z = zaposleniService.update(id, request);
            return z == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(z);
        }
        catch (Exception e) {
            return ResponseEntity.status((HttpStatus.ALREADY_REPORTED)).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            zaposleniService.delete(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
