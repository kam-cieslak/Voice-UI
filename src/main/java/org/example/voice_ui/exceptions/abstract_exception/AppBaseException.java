package org.example.voice_ui.exceptions.abstract_exception;

import lombok.Getter;
import lombok.Setter;
import org.example.voice_ui.exceptions.handler.ErrorCodes;

@Getter
@Setter
public class AppBaseException extends RuntimeException {
    private final ErrorCodes code;

    public AppBaseException(String message, ErrorCodes code) {
        super(message);
        this.code = code;
    }

}
