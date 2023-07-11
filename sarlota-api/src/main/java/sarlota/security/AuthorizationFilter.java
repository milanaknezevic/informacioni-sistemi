package sarlota.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.JwtZaposleni;
import sarlota.entities.enums.Role;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class AuthorizationFilter extends OncePerRequestFilter {
    @Value("${authorization.token.header.name}")
    private String authorizationHeaderName;
    @Value("${authorization.token.header.prefix}")
    private String authorizationHeaderPrefix;
    @Value("${authorization.token.secret}")
    private String authorizationSecret;

    @Value("RefreshToken")
    private String refreshHeaderName;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = httpServletRequest.getHeader(authorizationHeaderName);
        if (authorizationHeader == null || !authorizationHeader.startsWith(authorizationHeaderPrefix)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        String token = authorizationHeader.replace(authorizationHeaderPrefix, "");
        String refreshHeader = httpServletRequest.getHeader(refreshHeaderName);

        if (Boolean.parseBoolean(refreshHeader) == true) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(authorizationSecret)
                    .parseClaimsJws(token)
                    .getBody();
            JwtZaposleni z = new JwtZaposleni(new Zaposleni(Integer.valueOf(claims.getId()), claims.getSubject(), null, Role.valueOf(claims.get("role", String.class))));
            Authentication authentication = new UsernamePasswordAuthenticationToken(z, null, z.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (SignatureException e) {
        } catch (MalformedJwtException e) {
        } catch (ExpiredJwtException e) {
            httpServletResponse.resetBuffer();
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.flushBuffer();
            return;
        } catch (UnsupportedJwtException e) {
        } catch (IllegalArgumentException e) {
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }


}
