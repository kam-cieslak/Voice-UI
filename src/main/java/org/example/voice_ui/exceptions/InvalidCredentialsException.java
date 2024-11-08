package org.example.voice_ui.exceptions;

import org.example.voice_ui.exceptions.abstract_exception.UnauthorizedException;
import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class InvalidCredentialsException extends UnauthorizedException {
    private static final String MESSAGE = "Wrong credentials";

    public InvalidCredentialsException() {
        super(MESSAGE, ErrorCodes.INVALID_LOGIN_DATA);
    }
}
