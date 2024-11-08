package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class PreconditionFailedException extends AppBaseException {

    public PreconditionFailedException(String message, ErrorCodes code) {
        super(message, code);
    }

}
