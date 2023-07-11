package sarlota.entities.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import sarlota.entities.Zaposleni;

import java.util.Collection;
import java.util.Collections;

@Data
@AllArgsConstructor
public class JwtZaposleni implements UserDetails {

    private Zaposleni zaposleni;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(zaposleni.getTipZaposlenog().name()));
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return zaposleni.getLozinka();
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return zaposleni.getKorisnickoIme();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
