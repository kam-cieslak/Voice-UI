package org.example.voice_ui.auth.dto;


import org.example.voice_ui.util.validator.Password;
import org.example.voice_ui.util.validator.Username;

public record LoginDTO(
        @Username
        String username,

        @Password
        String password
) {
}
