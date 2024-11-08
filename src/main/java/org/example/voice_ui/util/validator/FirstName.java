package org.example.voice_ui.util.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.example.voice_ui.util.Patterns;
import org.example.voice_ui.util.messages.ValidationExceptionMessages;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = {})
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Pattern(regexp = Patterns.NAME_PATTERN, message = ValidationExceptionMessages.INVALID_FIRSTNAME_FORMAT)
@Size(min = 2, max = 32, message = ValidationExceptionMessages.INVALID_FIRSTNAME_FORMAT)
@NotBlank(message = ValidationExceptionMessages.INVALID_FIRSTNAME_FORMAT)
@Retention(RetentionPolicy.RUNTIME)
public @interface FirstName {

    String message() default ValidationExceptionMessages.INVALID_FIRSTNAME_FORMAT;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
