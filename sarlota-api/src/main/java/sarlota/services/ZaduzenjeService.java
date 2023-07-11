package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaduzenje;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ZaduzenjeDTO;
import sarlota.repositories.ZaduzenjeRepository;
import sarlota.repositories.ZaposleniRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZaduzenjeService {

    private final ZaduzenjeRepository zaduzenjeRepository;

    private final ZaposleniRepository zaposleniRepository;

    public List<Zaduzenje> getAll() { return zaduzenjeRepository.findAll(); }

    public Zaduzenje getOne(int id) { return zaduzenjeRepository.findById(id).orElse(null); }

    public Zaduzenje add(ZaduzenjeDTO zaduzenjeDTO){
        Zaposleni zaposleni = zaposleniRepository.findById(zaduzenjeDTO.getIdZaposlenog()).orElse(null);
        if(zaposleni == null){
            return null;
        }

        Zaduzenje zaduzenje = new Zaduzenje(
                null,
                zaduzenjeDTO.getNaslov(),
                zaduzenjeDTO.getOpis(),
                zaduzenjeDTO.getRokZaIzvrsenje(),
                zaduzenjeDTO.getStatus(),
                zaposleni
        );

        return zaduzenjeRepository.save(zaduzenje);
    }

    public Zaduzenje update(int id, ZaduzenjeDTO zaduzenjeDTO) {
        Zaduzenje zaduzenje = zaduzenjeRepository.findById(id).orElse(null);
        if(zaduzenje == null){
            return null;
        }

        zaduzenje.setNaslov(zaduzenjeDTO.getNaslov());
        zaduzenje.setOpis(zaduzenjeDTO.getOpis());
        zaduzenje.setRokZaIzvrsenje(zaduzenjeDTO.getRokZaIzvrsenje());
        zaduzenje.setStatus(zaduzenjeDTO.getStatus());

        return zaduzenjeRepository.save(zaduzenje);
    }

    public void delete(int id) { zaduzenjeRepository.deleteById(id); }
}
