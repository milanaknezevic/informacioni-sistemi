package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sarlota.entities.Nabavka;
import sarlota.entities.dto.NabavkaAddRequest;
import sarlota.entities.dto.NabavkaDTO;
import sarlota.services.NabavkaService;

import java.util.List;

@RestController
@RequestMapping("api/v1/nabavke")
@RequiredArgsConstructor
public class NabavkaController {

    private final NabavkaService nabavkaService;

    @GetMapping
    public ResponseEntity<List<NabavkaDTO>> getAll() {
        return ResponseEntity.ok(nabavkaService.getAll());
    }

    @PostMapping
    public ResponseEntity<Nabavka> add(@RequestBody NabavkaAddRequest nabavkaAddRequest) {
        try {
            Nabavka n = nabavkaService.add(nabavkaAddRequest);
            return n == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(n);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
