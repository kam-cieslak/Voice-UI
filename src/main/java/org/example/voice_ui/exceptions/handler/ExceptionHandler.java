package org.example.voice_ui.exceptions.handler;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.example.voice_ui.exceptions.abstract_exception.AppBaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;


@RestControllerAdvice
public class ExceptionHandler {

    //app exceptions
    @org.springframework.web.bind.annotation.ExceptionHandler
    ResponseEntity<Object> handleResponseStatusException(ResponseStatusException e) {
        if (!(e.getCause() instanceof AppBaseException)) {
            return ResponseEntity.status(e.getStatusCode()).body(new ExceptionResponse(e.getReason(), ErrorCodes.SOMETHING_WENT_WRONG));
        }
        final Throwable cause = e.getCause();
        return ResponseEntity.status(e.getStatusCode())
                .body(new ExceptionResponse(e.getReason(), ((AppBaseException) cause).getCode()));
    }

    @org.springframework.web.bind.annotation.ExceptionHandler
    public ResponseEntity<ExceptionResponse> handleConstraintViolationException(ConstraintViolationException e) {
        final ConstraintViolation<?> violation = e.getConstraintViolations().iterator().next();
        final String propertyPath = violation.getPropertyPath().toString();
        final String message = violation.getMessage();
        final String detailedMessage = propertyPath + ": " + message;
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(detailedMessage, ErrorCodes.VALIDATION_ERROR));
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ExceptionResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        final var error = ex.getBindingResult().getFieldErrors().get(0);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ExceptionResponse(error.getDefaultMessage(), ErrorCodes.VALIDATION_ERROR));
    }

}
