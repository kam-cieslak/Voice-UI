package org.example.voice_ui.dto.get;

import org.example.voice_ui.util._enum.GenderEnum;

public record GetAccountDTO(
        String email,
        String username,
        String firstName,
        String lastName,
        GenderEnum gender
) {
}
