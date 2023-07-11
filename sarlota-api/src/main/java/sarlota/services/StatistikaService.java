package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Narudzba;
import sarlota.entities.dto.*;
import sarlota.repositories.NarudzbaRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatistikaService {

    private final NarudzbaRepository narudzbaRepository;

    private final ReceptService receptService;

    public double profit(int days) throws Exception {
        List<Zarada> zarada = profitLastNDays(days);
        return zarada.stream().mapToDouble(Zarada::getZarada).sum();
    }


    public List<Potrosnja> expensesLastNDays(int brojDana) {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();
        List<Potrosnja> potrosnje = new ArrayList<>();

        LocalDate today = LocalDate.now().plusDays(1);
        LocalDate end = today.minusDays(brojDana);

        List<LocalDate> datumi = end.datesUntil(today).collect(Collectors.toList());

        for (LocalDate dan : datumi) {
            List<Narudzba> narudzbePoDanu = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isEqual(dan)).collect(Collectors.toList());
            double potrosnja = 0;

            for (Narudzba n : narudzbePoDanu) {
                ReceptDTO receptDTO = receptService.getOne(n.getIdRecepta());
                double trosak = receptDTO.getTrosakIzrade();

                if ("Srednja".equals(n.getVelicina())) {
                    trosak *= 1.5;
                } else if ("Velika".equals(n.getVelicina())) {
                    trosak *= 2;
                }
                potrosnja += trosak;
            }

            potrosnje.add(new Potrosnja(dan, potrosnja));
        }

        return potrosnje;
    }

    public List<Zarada> profitLastNDays(int brojDana) {
        List<Zarada> zarade = new ArrayList<>();
        List<Narudzba> narudzbe = narudzbaRepository.findAll();

        LocalDate today = LocalDate.now().plusDays(1);
        LocalDate end = today.minusDays(brojDana);

        List<LocalDate> datumi = end.datesUntil(today).collect(Collectors.toList());

        for (LocalDate dan : datumi) {
            List<Narudzba> narudzbePoDanu = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isEqual(dan)).collect(Collectors.toList());
            double zarada = 0;

            for (Narudzba n : narudzbePoDanu) {
               Integer kolicina=n.getBrojKomada();
                ReceptDTO receptDTO = receptService.getOne(n.getIdRecepta());
                double trosak = receptDTO.getTrosakIzrade();

                if ("Srednja".equals(n.getVelicina())) {
                    trosak *= 1.5;
                } else if ("Velika".equals(n.getVelicina())) {
                    trosak *= 2;
                }

               zarada += ((n.getCijena()) - (trosak));
                //zarada += ((n.getCijena()) - (trosak));
            }

            zarade.add(new Zarada(dan, zarada));
        }

        return zarade;
    }

    public List<GrupisaneNarudzbeDto> grupisaneNarudzbe(int brojDana) {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();

        LocalDate today = LocalDate.now().plusDays(1);
        LocalDate end = today.minusDays(brojDana);
        List<Narudzba> narudzbe_u_n_dana=new ArrayList<>();
        if(brojDana == 1)
        {
            LocalDate pom = today.minusDays(brojDana);
            narudzbe_u_n_dana = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isEqual(pom)).collect(Collectors.toList());;

        }
        else
        {

             narudzbe_u_n_dana = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isBefore(today) && e.getDatumIsporuke().toLocalDate().isAfter(end)).collect(Collectors.toList());

        }
        Map<String, Integer> grupisaneNarudzbe = narudzbe_u_n_dana.stream()
                .collect(Collectors.groupingBy(Narudzba::getNaziv, Collectors.summingInt(Narudzba::getBrojKomada)));

        List<GrupisaneNarudzbeDto> lista = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : grupisaneNarudzbe.entrySet()) {
            String key = entry.getKey();
            Narudzba nazivPotencial = narudzbe_u_n_dana.stream().filter(e -> e.getNaziv().equals(key)).findFirst().orElse(null);
            Double cijena = null;
            if (nazivPotencial != null) {
                cijena = nazivPotencial.getCijena();
            }
            Integer value = entry.getValue();
            GrupisaneNarudzbeDto grupisaneNarudzbeDto = new GrupisaneNarudzbeDto();
            grupisaneNarudzbeDto.setCategory(key);
            grupisaneNarudzbeDto.setValue(value);
            grupisaneNarudzbeDto.setCijena(cijena);
            lista.add(grupisaneNarudzbeDto);

        }
        return lista;
    }

    public List<PotrosnjaNarudzbeDTO> potrosnjaNarudzbe(int brojDana) {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();

        LocalDate today = LocalDate.now().plusDays(1);
        LocalDate end = today.minusDays(brojDana);
        List<Narudzba> narudzbe_u_n_dana = new ArrayList<>();


        if(brojDana == 1)
        {

            narudzbe_u_n_dana = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isEqual(end)).collect(Collectors.toList());
        }
        else
        {
            narudzbe_u_n_dana = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isBefore(today) && e.getDatumIsporuke().toLocalDate().isAfter(end)).collect(Collectors.toList());
        }
        List<GrupisaneNarudzbeDto> lista = new ArrayList<>();
        List<Narudzba> jedinstveneNarudzbe = narudzbe_u_n_dana.stream()
                .collect(Collectors.groupingBy(Narudzba::getNaziv))
                .values()
                .stream()
                .map(narudzbas -> narudzbas.get(0))
                .collect(Collectors.toList());
        List<PotrosnjaNarudzbeDTO> potrosnjaNarudzbeDTOS = new ArrayList<>();


        Map<String, Integer> kolicinaNarudzbiPoNazivu = narudzbe_u_n_dana.stream()
                .collect(Collectors.groupingBy(Narudzba::getNaziv, Collectors.summingInt(Narudzba::getBrojKomada)));


        for (Narudzba n : jedinstveneNarudzbe) {

            String naziv = n.getNaziv();
            Integer kolicina = kolicinaNarudzbiPoNazivu.get(naziv);

            Integer receptId = n.getIdRecepta();
            ReceptDTO potrosnja = receptService.getOne(receptId);
            PotrosnjaNarudzbeDTO potrosnjaNarudzbeDTO=new PotrosnjaNarudzbeDTO();
            potrosnjaNarudzbeDTO.setCategory(n.getNaziv());
            potrosnjaNarudzbeDTO.setValue(potrosnja.getTrosakIzrade()*kolicina);
            potrosnjaNarudzbeDTO.setKolicina(kolicina);
            potrosnjaNarudzbeDTOS.add(potrosnjaNarudzbeDTO);
        }


        return potrosnjaNarudzbeDTOS;
    }

    public List<Narudzba> bestseleri()
    {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();
        Map<String, Integer> nazivSumaMap = narudzbe.stream()
                .collect(Collectors.groupingBy(Narudzba::getNaziv, Collectors.summingInt(Narudzba::getBrojKomada)));

        List<Map.Entry<String, Integer>> sortedEntries = new ArrayList<>(nazivSumaMap.entrySet());
        sortedEntries.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        List<Narudzba> top3Narudzbe = sortedEntries.stream()
                .limit(5)
                .flatMap(entry -> narudzbe.stream().filter(n -> n.getNaziv().equals(entry.getKey())))
                .collect(Collectors.toList());
        List<Narudzba> distinctNarudzbe = top3Narudzbe.stream()
                .collect(Collectors.groupingBy(Narudzba::getNaziv))
                .values()
                .stream()
                .flatMap(narudzbeList -> narudzbeList.stream().limit(1))
                .collect(Collectors.toList());

        return distinctNarudzbe;
    }

}
