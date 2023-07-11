package sarlota.services;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.JwtZaposleni;
import sarlota.entities.dto.LoginResponse;
import sarlota.entities.dto.TokenResponse;
import sarlota.entities.enums.Role;
import sarlota.entities.requests.LoginRequest;
import sarlota.entities.requests.RefreshRequest;
import sarlota.entities.requests.ZaposleniUpdateZaposleniRequest;

import java.math.BigDecimal;
import java.util.Date;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final ZaposleniService zaposleniService;

    private final PasswordEncoder passwordEncoder;
    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;

    public AuthService(AuthenticationManager authenticationManager, ZaposleniService zaposleniService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.zaposleniService = zaposleniService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) throws Exception {
        String response = null;

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getKorisnickoIme(), request.getLozinka()));
        JwtZaposleni jwtZaposleni = (JwtZaposleni) authenticate.getPrincipal();
        Zaposleni z = zaposleniService.getOne(jwtZaposleni.getZaposleni().getId());
        jwtZaposleni.setZaposleni(z);
        response = generateJwt(jwtZaposleni);

        return new LoginResponse(z.getId(), response, z.getPlata(), z.getTipZaposlenog(), z.getIme(), z.getPrezime(), z.getKorisnickoIme(), z.getFotografija());
    }

    public TokenResponse refreshToken(RefreshRequest request) {
        try {
            Claims claims = Jwts.parser().setSigningKey(tokenSecret).parseClaimsJws(request.getToken()).getBody();

        } catch (ExpiredJwtException e) {
            Claims c = e.getClaims();
            Zaposleni z = new Zaposleni(Integer.valueOf(c.getId()), c.getSubject(), c.get("firstName", String.class), c.get("lastName", String.class), null, new BigDecimal((Double) c.get("salary", Double.class)), Role.valueOf(c.get("role", String.class)), null);
            return new TokenResponse(generateJwt(new JwtZaposleni(z)));
        }
        return null;
    }

    public Zaposleni edit(int id, ZaposleniUpdateZaposleniRequest request) throws Exception {
        Zaposleni z = zaposleniService.getOne(id);

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(z.getKorisnickoIme(), request.getLozinka()));


        return zaposleniService.edit(z, request);

    }



    public String generateJwt(JwtZaposleni jwtZaposleni) {
        return Jwts.builder().setId(jwtZaposleni.getZaposleni().getId().toString()).setSubject(jwtZaposleni.getZaposleni().getKorisnickoIme()).claim("role", jwtZaposleni.getZaposleni().getTipZaposlenog().name()).claim("firstName", jwtZaposleni.getZaposleni().getIme()).claim("lastName", jwtZaposleni.getZaposleni().getPrezime()).claim("salary", jwtZaposleni.getZaposleni().getPlata()).setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime))).signWith(SignatureAlgorithm.HS512, tokenSecret).compact();
    }
}
