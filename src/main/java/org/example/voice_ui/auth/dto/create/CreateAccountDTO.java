package org.example.voice_ui.auth.dto.create;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.example.voice_ui.util._enum.GenderEnum;
import org.example.voice_ui.util.messages.ValidationExceptionMessages;
import org.example.voice_ui.util.validator.FirstName;
import org.example.voice_ui.util.validator.LastName;
import org.example.voice_ui.util.validator.Password;
import org.example.voice_ui.util.validator.Username;

public record CreateAccountDTO(

        @Username
        String username,

        @Password
        String password,

        @NotBlank(message = ValidationExceptionMessages.INVALID_EMAIL_FORMAT)
        @Email(message = ValidationExceptionMessages.INVALID_EMAIL_FORMAT)
        String email,

        @NotNull(message = ValidationExceptionMessages.INCORRECT_GENDER)
        GenderEnum gender,

        @FirstName
        String firstName,

        @LastName
        String lastName

) {
}
