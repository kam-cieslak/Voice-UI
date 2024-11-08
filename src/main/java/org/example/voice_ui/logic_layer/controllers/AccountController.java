package org.example.voice_ui.logic_layer.controllers;

import org.example.voice_ui.util._enum.SecuredRole;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/accounts")
public interface AccountController {


    @Secured(SecuredRole.ROLE_PLAYER)
    @GetMapping
    public ResponseEntity <String> test();

}
