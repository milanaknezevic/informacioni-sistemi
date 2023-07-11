package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.JwtZaposleni;
import sarlota.entities.dto.TokenResponse;
import sarlota.entities.dto.ZaposleniDTO;
import sarlota.entities.requests.SignUpRequest;
import sarlota.entities.requests.ZaposleniUpdateRequest;
import sarlota.entities.requests.ZaposleniUpdateZaposleniRequest;
import sarlota.repositories.ZaposleniRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.Base64Utils;

@Service
@RequiredArgsConstructor
public class ZaposleniService {

    private final ZaposleniRepository zaposleniRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Zaposleni> getAll() {
        return zaposleniRepository.findAll();
    }


    public Zaposleni edit(Zaposleni z, ZaposleniUpdateZaposleniRequest request) {
        Zaposleni otherZaposleni = zaposleniRepository.findByUsername(request.getKorisnickoIme());
        if(otherZaposleni != null && otherZaposleni.getId() != z.getId() && otherZaposleni.getKorisnickoIme().equals(request.getKorisnickoIme()))
            return null;



        z.setKorisnickoIme(request.getKorisnickoIme());
        z.setLozinka(passwordEncoder.encode(request.getNovaLozinka()));
        z.setPrezime(request.getPrezime());
        z.setIme(request.getIme());
        z.setFotografija(request.getFotografija());
        return zaposleniRepository.save(z);
    }


    public List<Zaposleni> search(String keyword) {
        try {
            int id = Integer.parseInt(keyword);
            Zaposleni z = zaposleniRepository.findById(id).orElse(null);
            List<Zaposleni> zaposleni = new ArrayList<Zaposleni>();
            if (z != null) {
                zaposleni.add(z);
            }
            return zaposleni;
        } catch (NumberFormatException e) {
        }
        return zaposleniRepository.findByKeyword("%" + keyword + "%");
    }


    public Zaposleni getOne(int id) {
        return zaposleniRepository.findById(id).orElse(null);
    }

    public Zaposleni add(ZaposleniDTO zaposleniDTO) {
        Zaposleni zaposleni = new Zaposleni(
                0,
                zaposleniDTO.getIme(),
                zaposleniDTO.getPrezime(),
                zaposleniDTO.getKorisnickoIme(),
                passwordEncoder.encode(zaposleniDTO.getLozinka()),
                zaposleniDTO.getPlata(),
                zaposleniDTO.getTipZaposlenog(),
                zaposleniDTO.getFotografija()
        );
        return zaposleniRepository.save(zaposleni);

    }

    public Zaposleni update(int id, ZaposleniUpdateRequest request) throws Exception {
        Zaposleni z = zaposleniRepository.findById(id).orElse(null);
        if (z == null) {
            return null;
        }
        Zaposleni otherZaposleni = zaposleniRepository.findByUsername(request.getKorisnickoIme());

        if(otherZaposleni != null && id != otherZaposleni.getId() && otherZaposleni.getKorisnickoIme().equals(request.getKorisnickoIme())){
            return null;
        }


        z.setIme(request.getIme());
        z.setPrezime(request.getPrezime());
//         z.setKorisnickoIme(request.getKorisnickoIme());
        z.setPlata(request.getPlata());
        z.setTipZaposlenog(request.getTipZaposlenog());
        z.setFotografija(request.getFotografija());
        return zaposleniRepository.save(z);
    }

    public void delete(int id) throws Exception {
        if (zaposleniRepository.count() == 1) throw new Exception();
        zaposleniRepository.deleteById(id);
    }

    public void signup(SignUpRequest request) throws Exception {
        if (zaposleniRepository.findByUsername(request.getKorisnickoIme()) != null) {
            throw new Exception();
        }
        Zaposleni z = new Zaposleni(null, request.getKorisnickoIme(), request.getIme(), request.getPrezime(),
                passwordEncoder.encode(request.getLozinka()), new BigDecimal(0), request.getTipZaposlenog(), request.getFotografija());
        zaposleniRepository.save(z);
    }

}
