package org.example.voice_ui.exceptions.handler;

public record ExceptionResponse(
        String message,
        ErrorCodes exceptionCode
) {
}