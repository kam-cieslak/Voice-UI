package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class InternalServerErrorException extends AppBaseException {

    public InternalServerErrorException(String message, ErrorCodes code) {
        super(message, code);
    }

}
