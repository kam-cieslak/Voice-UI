package org.example.voice_ui.auth.services.impl;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.example.voice_ui.util.RoleEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtService {
    private final JwtEncoder jwtEncoder;

    @Value("${jwt.expiration}")
    private long expirationJwt;

    @Value("${jwt.issuer}")
    private String issuer;

    private static final String USERNAME_CLAIM = "username";
    private static final String AUTHORITIES_CLAIM = "authorities";

    public String generateToken(final ObjectId id, final String username, final Set<RoleEnum> roles) {
        final Instant instant = Instant.now();
        final JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .issuedAt(instant)
                .expiresAt(instant.plus(expirationJwt, ChronoUnit.HOURS))
                .subject(id.toString())
                .claim(AUTHORITIES_CLAIM, roles)
                .claim(USERNAME_CLAIM, username)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}