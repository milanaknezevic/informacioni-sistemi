package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Kontakt;
import sarlota.entities.Narudzba;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.NarudzbaDTO;
import sarlota.repositories.NarudzbaRepository;
import sarlota.repositories.ReceptRepository;
import sarlota.repositories.ZaposleniRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NarudzbaService {
    private final NarudzbaRepository narudzbaRepository;
    private final ReceptRepository receptRepository;

    public List<NarudzbaDTO> getAll() {
        return narudzbaRepository.findAll().stream().map(elem -> new NarudzbaDTO(elem.getId(),
                elem.getDatumPrijema(), elem.getDatumIsporuke(), elem.getAktivna(),
                elem.getBrojKomada(), elem.getNaziv(), elem.getNapomene(),
                elem.getSlika(), elem.getKontakt(), elem.getAdresa(),
                elem.getImeNarucioca(), elem.getVelicina(), elem.getCijena(),
                findReceptNaslov(elem.getIdRecepta())
        )).collect(Collectors.toList());
    }

    public NarudzbaDTO getOne(int id) {
        Narudzba narudzba = narudzbaRepository.findById(id).orElse(null);
        NarudzbaDTO narudzbaDTO = null;
        narudzbaDTO.setId(narudzba.getId());
        narudzbaDTO.setDatumPrijema(narudzba.getDatumPrijema());
        narudzbaDTO.setDatumIsporuke(narudzba.getDatumIsporuke());
        narudzbaDTO.setAktivna(narudzba.getAktivna());
        narudzbaDTO.setBrojKomada(narudzba.getBrojKomada());
        narudzbaDTO.setNaziv(narudzba.getNaziv());
        narudzbaDTO.setNapomene(narudzba.getNapomene());
        narudzbaDTO.setSlika(narudzba.getSlika());
        narudzbaDTO.setKontakt(narudzba.getKontakt());
        narudzbaDTO.setAdresa(narudzba.getAdresa());
        narudzbaDTO.setImeNarucioca(narudzba.getImeNarucioca());
        narudzbaDTO.setVelicina(narudzba.getVelicina());
        narudzbaDTO.setCijena(narudzba.getCijena());
        narudzbaDTO.setNazivRecepta(findReceptNaslov(narudzba.getIdRecepta()));
        return narudzbaDTO;
    }

    private String findReceptNaslov(Integer idRecepta) {
        return receptRepository.findAll().stream()
                .filter(elem -> elem.getId() == idRecepta)
                .findFirst().get().getNaslov();
    }

    public Narudzba add(NarudzbaDTO narudzbaDTO) {

        Narudzba narudzba = new Narudzba(
                null,
                narudzbaDTO.getDatumPrijema(),
                narudzbaDTO.getDatumIsporuke(),
                narudzbaDTO.getAktivna(),
                narudzbaDTO.getBrojKomada(),
                narudzbaDTO.getNaziv(),
                narudzbaDTO.getNapomene(),
                narudzbaDTO.getSlika(),
                narudzbaDTO.getKontakt(),
                narudzbaDTO.getAdresa(),
                narudzbaDTO.getImeNarucioca(),
                narudzbaDTO.getVelicina(),
                narudzbaDTO.getCijena(),
                findIdForRecept(narudzbaDTO.getNazivRecepta())

        );

        return narudzbaRepository.save(narudzba);
    }

    private Integer findIdForRecept(String nazivRecepta) {
        return receptRepository.findAll().stream()
                .filter(elem -> elem.getNaslov().equals(nazivRecepta))
                .findFirst().get().getId();
    }

    public Narudzba update(int id, NarudzbaDTO narudzbaDTO) {
        Narudzba narudzba = narudzbaRepository.findById(id).orElse(null);
        if (narudzba == null) {
            return null;
        }

        narudzba.setDatumIsporuke(narudzbaDTO.getDatumIsporuke());
        narudzba.setDatumPrijema(narudzbaDTO.getDatumPrijema());
        narudzba.setBrojKomada(narudzbaDTO.getBrojKomada());
        narudzba.setNaziv(narudzbaDTO.getNaziv());
        narudzba.setNapomene(narudzbaDTO.getNapomene());
        narudzba.setSlika(narudzbaDTO.getSlika());
        narudzba.setImeNarucioca(narudzbaDTO.getImeNarucioca());
        narudzba.setKontakt(narudzbaDTO.getKontakt());
        narudzba.setAdresa(narudzbaDTO.getAdresa());
        narudzba.setCijena(narudzbaDTO.getCijena());
        narudzba.setVelicina(narudzbaDTO.getVelicina());
        narudzba.setIdRecepta(findIdForRecept(narudzbaDTO.getNazivRecepta()));

        return narudzbaRepository.save(narudzba);
    }

    public List<NarudzbaDTO> search(String keyword) {
        //       try {
//            int id = Integer.parseInt(keyword);
//            Narudzba k = narudzbaRepository.findById(id).orElse(null);
//            List<Narudzba> narudzbe = new ArrayList<Narudzba>();
//            if (k != null) {
//                narudzbe.add(k);
//            }
//            return narudzbe;
//        } catch (NumberFormatException e) {
//        }
//        return narudzbaRepository.findByKeyword("%" + keyword + "%");
        //     }
        return narudzbaRepository.findAll().stream().filter(elem ->
                        elem.getImeNarucioca().equals(keyword))
                .map(elem -> new NarudzbaDTO(elem.getId(),
                        elem.getDatumPrijema(), elem.getDatumIsporuke(), elem.getAktivna(),
                        elem.getBrojKomada(), elem.getNaziv(), elem.getNapomene(),
                        elem.getSlika(), elem.getKontakt(), elem.getAdresa(),
                        elem.getImeNarucioca(), elem.getVelicina(), elem.getCijena(),
                        findReceptNaslov(elem.getIdRecepta()))).collect(Collectors.toList());
    }

    public void delete(int id) {
        narudzbaRepository.deleteById(id);
    }

    public List<Narudzba> searchByDeliveryDate(LocalDateTime startDate, LocalDateTime endDate) {
        return narudzbaRepository.findByDatumIsporuke(startDate, endDate);
    }

    public List<Narudzba> searchByOrderDate(LocalDateTime startDate, LocalDateTime endDate) {
        return narudzbaRepository.findByDatumPrijema(startDate, endDate);
    }

    public List<Narudzba> filter(String today, String tomorrow) {
        return narudzbaRepository.findAll().stream()
                .filter(elem -> (today != null && String.valueOf(elem.getDatumIsporuke().toLocalDate())
                        .equals(today)) || (tomorrow != null && String.valueOf(elem.getDatumIsporuke().toLocalDate()).equals(tomorrow)))
                .collect(Collectors.toList());

    }

    public Integer count(int brojDana) {
         return searchByOrderDate( LocalDateTime.now().minusDays(brojDana), LocalDateTime.now()).size();
    }
    public Narudzba changeStatus(int id) {
        Narudzba narudzba = narudzbaRepository.findById(id).orElse(null);
        if (narudzba == null) {
            return null;
        }

        narudzba.setAktivna(false);


        return narudzbaRepository.save(narudzba);
    }
}
