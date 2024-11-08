package org.example.voice_ui.auth.controllers;

import jakarta.validation.Valid;
import org.example.voice_ui.auth.dto.LoginDTO;
import org.example.voice_ui.auth.dto.LoginDTOResponse;
import org.example.voice_ui.auth.dto.create.CreateAccountDTO;
import org.example.voice_ui.dto.get.GetAccountDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/auth")
public interface AuthController {

    @PostMapping("/sign-in")
    ResponseEntity<LoginDTOResponse> signIn(@Valid @RequestBody final LoginDTO request);

    @PostMapping("/sign-up")
    ResponseEntity<GetAccountDTO> signUp(@Valid @RequestBody final CreateAccountDTO request);

}

