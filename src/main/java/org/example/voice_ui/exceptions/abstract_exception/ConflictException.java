package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class ConflictException extends AppBaseException {

    public ConflictException(String message, ErrorCodes code) {
        super(message, code);
    }

}
