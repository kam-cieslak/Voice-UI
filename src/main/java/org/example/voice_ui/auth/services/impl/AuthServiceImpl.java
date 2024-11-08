package org.example.voice_ui.auth.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.voice_ui.auth.dto.LoginDTOResponse;
import org.example.voice_ui.auth.dto.create.CreateAccountDTO;
import org.example.voice_ui.auth.services.AuthService;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.exceptions.InvalidCredentialsException;
import org.example.voice_ui.logic_layer.repositories.AccountRepository;
import org.example.voice_ui.mappers.AccountMapper;
import org.example.voice_ui.util.RoleEnum;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AccountMapper mapper;

    public Account create(final CreateAccountDTO accountDTO) {
        final Account account = mapper.mapCreateAccountDTOToAccount(accountDTO);
        account.addRole(RoleEnum.PLAYER);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }

    public LoginDTOResponse signIn(final String username, final String password) throws InvalidCredentialsException {
        final Account account = accountRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);
        throwIfInvalidCredential(password, account.getPassword());

        final Set<RoleEnum> roles = account.getRoles();
        final String token = jwtService.generateToken(account.getId(), account.getUsername(), roles);
        return new LoginDTOResponse(token);
    }

    private void throwIfInvalidCredential(final String password, final String accountPassword) throws InvalidCredentialsException {
        if (!passwordEncoder.matches(password, accountPassword)) {
            throw new InvalidCredentialsException();
        }
    }

}
