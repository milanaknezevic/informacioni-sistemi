package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sarlota.entities.Narudzba;
import sarlota.entities.dto.GrupisaneNarudzbeDto;
import sarlota.entities.dto.Potrosnja;
import sarlota.entities.dto.PotrosnjaNarudzbeDTO;
import sarlota.entities.dto.Zarada;
import sarlota.services.NarudzbaService;
import sarlota.services.StatistikaService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/statistika")
@RequiredArgsConstructor
public class StatistikaController {

    private final NarudzbaService narudzbaService;
    private final StatistikaService statistikaService;


    @GetMapping("/brojNarudzbi")
    ResponseEntity<Integer> count(@RequestParam(value = "query") String keyword) {
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();
            return ResponseEntity.ok(narudzbaService.count(brojDana));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/ukupnaZarada")
    ResponseEntity<Double> profit(@RequestParam(value = "query") int days){
        try{
            return ResponseEntity.ok(statistikaService.profit(days));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/bestseleri")
    ResponseEntity<List<Narudzba>> bestseleri(){
        try{
            return ResponseEntity.ok(statistikaService.bestseleri());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/zarada")
    ResponseEntity<List<Zarada>> profitLastNDays(@RequestParam(value = "query") String keyword){
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();
            List<Zarada> zarada=statistikaService.profitLastNDays(brojDana);

            return ResponseEntity.ok(zarada);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/potrosnja")
    ResponseEntity<List<Potrosnja>> potrosnja(@RequestParam(value = "query") String keyword){
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();

            return ResponseEntity.ok(statistikaService.expensesLastNDays(brojDana));
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/grupisaneNarudzbe")
    ResponseEntity<List<GrupisaneNarudzbeDto>> grupisaneNarudzbe(@RequestParam(value = "query") String keyword){
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();
            List<GrupisaneNarudzbeDto> pom=  statistikaService.grupisaneNarudzbe(brojDana);
            return ResponseEntity.ok(statistikaService.grupisaneNarudzbe(brojDana));
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/grupisanaPotrosnja")
    ResponseEntity<List<PotrosnjaNarudzbeDTO>> potrosnjaNarudzbi(@RequestParam(value = "query") String keyword){
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();

            return ResponseEntity.ok(statistikaService.potrosnjaNarudzbe(brojDana));
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
