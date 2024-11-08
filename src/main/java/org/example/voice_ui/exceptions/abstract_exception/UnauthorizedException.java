package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class UnauthorizedException extends AppBaseException {

    public UnauthorizedException(String message, ErrorCodes code) {
        super(message, code);
    }

}
