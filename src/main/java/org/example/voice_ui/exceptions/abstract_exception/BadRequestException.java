package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class BadRequestException extends AppBaseException {

    public BadRequestException(String message, ErrorCodes code) {
        super(message, code);
    }

}
