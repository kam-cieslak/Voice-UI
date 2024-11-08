package org.example.voice_ui.util.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.example.voice_ui.util.messages.ValidationExceptionMessages;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = {})
@Target({ElementType.FIELD, ElementType.PARAMETER})
@NotBlank(message = ValidationExceptionMessages.INVALID_USERNAME_FORMAT)
@Size(min = 3, max = 32, message = ValidationExceptionMessages.INVALID_USERNAME_FORMAT)
@Retention(RetentionPolicy.RUNTIME)
public @interface Username {

    String message() default ValidationExceptionMessages.INVALID_USERNAME_FORMAT;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
