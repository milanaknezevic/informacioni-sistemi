package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import sarlota.entities.Namirnica;
import sarlota.entities.dto.NamirnicaDTO;
import sarlota.repositories.NamirnicaRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NamirnicaService {

    private final NamirnicaRepository namirnicaRepository;

    public List<Namirnica> getAll(){
        return namirnicaRepository.findAll();
    }

    public Namirnica getById(int id){
        return namirnicaRepository.findById(id).orElse(null);
    }

    public Namirnica add(NamirnicaDTO namirnica) {
        Namirnica n = new Namirnica(
                null,
                namirnica.getNaziv(),
                namirnica.getCijenaPoJedinici(),
                namirnica.getJedinica()
        );
        return namirnicaRepository.save(n);
    }
}
