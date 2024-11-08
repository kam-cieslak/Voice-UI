package org.example.voice_ui.logic_layer.controllers.impl;

import org.example.voice_ui.logic_layer.controllers.AccountController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountControllerImpl implements AccountController {

    @Override
    public ResponseEntity<String> test() {
        return ResponseEntity.status(HttpStatus.OK).body("Test");
    }
}
