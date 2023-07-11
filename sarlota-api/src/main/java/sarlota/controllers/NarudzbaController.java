package sarlota.controllers;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sarlota.entities.Narudzba;
import sarlota.entities.dto.NarudzbaDTO;
import sarlota.services.NarudzbaService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/v1/narudzbe")
@RequiredArgsConstructor
public class NarudzbaController {
    private final NarudzbaService narudzbaService;

    @GetMapping
    public ResponseEntity<List<NarudzbaDTO>> getAll() {
        return ResponseEntity.ok(narudzbaService.getAll());
    }

    @GetMapping("/search")
    ResponseEntity<List<Narudzba>> search(@RequestParam(value = "by") String searchBy, @RequestParam(value = "start") String startDateTime,
                                          @RequestParam(value = "end", required = false) String endDateTime) {
        LocalDateTime start = null;
        LocalDateTime end = null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        if (endDateTime == null) {
            try {
                int numberOfDays = Integer.parseInt(startDateTime);
                if (numberOfDays > 0) {
                    start = LocalDateTime.now();
                    end = start.plusDays(numberOfDays);
                } else {
                    end = LocalDateTime.now();
                    start = end.plusDays(numberOfDays);
                }
            } catch (NumberFormatException nfe) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } else {
            try {
                start = LocalDateTime.parse(startDateTime, formatter);
                end = LocalDateTime.parse(endDateTime, formatter);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        if (searchBy.equals("delivery"))
            return ResponseEntity.ok(narudzbaService.searchByDeliveryDate(start, end));
        else if (searchBy.equals("order")) {
            return ResponseEntity.ok(narudzbaService.searchByOrderDate(start, end));
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/filter")
    ResponseEntity<List<Narudzba>> filter(@RequestParam(value = "today") String today,
                                          @RequestParam(value = "tomorrow") String tomorrow) {
        return ResponseEntity.ok(narudzbaService.filter(today, tomorrow));
    }

    @GetMapping("/search/narucilac")
    ResponseEntity<List<NarudzbaDTO>> search(@RequestParam(value = "query") String keyword) {
        if (keyword.length() == 0) return ResponseEntity.ok(narudzbaService.getAll());
        else return ResponseEntity.ok(narudzbaService.search(keyword));
    }


    @GetMapping("/{id}")
    public ResponseEntity<NarudzbaDTO> getOne(@PathVariable int id) {
        NarudzbaDTO narudzbaDTO = narudzbaService.getOne(id);
        return narudzbaDTO == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzbaDTO);
    }

    @PostMapping
    public ResponseEntity<Narudzba> add(@RequestBody NarudzbaDTO narudzbaDTO) {
        try {
            Narudzba narudzba = narudzbaService.add(narudzbaDTO);
            return narudzba == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzba);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Narudzba> update(@PathVariable int id, @RequestBody NarudzbaDTO narudzbaDTO) {
        try {
            Narudzba narudzba = narudzbaService.update(id, narudzbaDTO);
            return narudzba == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzba);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/changeStatus/{id}")
    public ResponseEntity<Narudzba> changeStatus(@PathVariable int id ) {
        try {
            Narudzba narudzba = narudzbaService.changeStatus(id);
            return narudzba == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzba);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            narudzbaService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
