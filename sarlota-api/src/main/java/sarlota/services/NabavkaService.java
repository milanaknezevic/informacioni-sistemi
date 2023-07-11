package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Nabavka;
import sarlota.entities.NabavkaNamirnice;
import sarlota.entities.Namirnica;
import sarlota.entities.dto.NabavkaAddRequest;
import sarlota.entities.dto.NabavkaDTO;
import sarlota.entities.dto.NabavkaNamirniceDTO;
import sarlota.entities.dto.NabavljenaNamirnicaDTO;
import sarlota.repositories.NabavkaNamirniceRepository;
import sarlota.repositories.NabavkaRepository;
import sarlota.repositories.NamirnicaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NabavkaService {

    private final NabavkaRepository nabavkaRepository;
    private final NabavkaNamirniceRepository nabavkaNamirniceRepository;
    private final NamirnicaRepository namirnicaRepository;

    public List<NabavkaDTO> getAll() {
        List<NabavkaDTO> result = new ArrayList<>();
        List<Nabavka> nabavke = nabavkaRepository.findAll();

        for(Nabavka nabavka : nabavke) {
            List<NabavljenaNamirnicaDTO> nabavljeneNamirnice = new ArrayList<>();

            // sve namirnice u jednoj nabavci
            List<NabavkaNamirnice> namirnice = nabavkaNamirniceRepository.findByIdNabavke(nabavka.getId());
            double ukupnaCijena = 0;

            for(NabavkaNamirnice nabavkaNamirnica : namirnice) {
                Namirnica namirnica = namirnicaRepository.findById(nabavkaNamirnica.getIdNamirnice()).get();
                double cijena = nabavkaNamirnica.getKolicina() * namirnica.getCijenaPoJedinici();
                nabavljeneNamirnice.add(new NabavljenaNamirnicaDTO(namirnica,cijena,nabavkaNamirnica.getKolicina()));
                ukupnaCijena+=cijena;
            }
            result.add(new NabavkaDTO(nabavka.getId(),nabavka.getDatum(),ukupnaCijena,nabavljeneNamirnice));
        }
        return result;
    }


    public Nabavka add(NabavkaAddRequest nabavkaAddRequest) {
        Nabavka nabavka = new Nabavka();

        List<NabavkaNamirniceDTO> namirnice =  nabavkaAddRequest.getNamirnice();

        double cijena=0;
        for(NabavkaNamirniceDTO n : namirnice) {
            Namirnica namirnica = namirnicaRepository.getById(n.getIdNamirnice());
            cijena+= namirnica.getCijenaPoJedinici() * n.getKolicina();
        }

        nabavka.setId(0);
        nabavka.setCijena(cijena);
        nabavka.setDatum(nabavkaAddRequest.getDatum());

        nabavka = nabavkaRepository.save(nabavka);

        for(NabavkaNamirniceDTO n : namirnice) {
            nabavkaNamirniceRepository.save(new NabavkaNamirnice(0,nabavka.getId(),n.getIdNamirnice(),n.getKolicina()));
        }

        return nabavka;
    }
}
