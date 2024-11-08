package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class NotFoundException extends AppBaseException {

    public NotFoundException(String message, ErrorCodes code) {
        super(message, code);
    }

}
