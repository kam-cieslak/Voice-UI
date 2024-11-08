package org.example.voice_ui.document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.example.voice_ui.util._enum.GenderEnum;
import org.example.voice_ui.util.validator.FirstName;
import org.example.voice_ui.util.validator.LastName;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
public class PersonalData {

    @NotBlank()
    @Email()
    @Indexed(unique = true)
    private String email;

    @NotNull
    private GenderEnum gender;

    @FirstName
    private String firstName;

    @LastName
    private String lastName;

}
