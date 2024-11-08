package org.example.voice_ui.exceptions.abstract_exception;


import org.example.voice_ui.exceptions.handler.ErrorCodes;

public class UnprocessableEntityException extends AppBaseException {

    public UnprocessableEntityException(String message, ErrorCodes code) {
        super(message, code);
    }

}
