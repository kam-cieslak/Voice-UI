package org.example.voice_ui.auth.controllers.impl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.voice_ui.auth.controllers.AuthController;
import org.example.voice_ui.auth.dto.LoginDTO;
import org.example.voice_ui.auth.dto.LoginDTOResponse;
import org.example.voice_ui.auth.dto.create.CreateAccountDTO;
import org.example.voice_ui.auth.services.AuthService;
import org.example.voice_ui.dto.get.GetAccountDTO;
import org.example.voice_ui.exceptions.abstract_exception.UnauthorizedException;
import org.example.voice_ui.mappers.AccountMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class AuthControllerImpl implements AuthController {

    private final AuthService authService;
    private final AccountMapper mapper;

    public ResponseEntity<LoginDTOResponse> signIn(@Valid @RequestBody final LoginDTO request) {
        try {
            final LoginDTOResponse loginDTO = authService.signIn(request.username(), request.password());
            return ResponseEntity.status(HttpStatus.OK).body(loginDTO);
        } catch (UnauthorizedException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
        }
    }

    public ResponseEntity<GetAccountDTO> signUp(@Valid @RequestBody final CreateAccountDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                mapper.mapAccountToGetAccountDTO(
                        authService.create(request)
                )
        );
    }

}

