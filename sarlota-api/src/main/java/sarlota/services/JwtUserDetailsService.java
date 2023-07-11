package sarlota.services;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.JwtZaposleni;
import sarlota.repositories.ZaposleniRepository;

@AllArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final ZaposleniRepository zaposleniRepository;

    @Override
    public JwtZaposleni loadUserByUsername(String username) throws UsernameNotFoundException {
        Zaposleni z = zaposleniRepository.findByUsername(username);
        if (z == null) throw new UsernameNotFoundException(username);
        return new JwtZaposleni(z);
    }
}
