package org.example.voice_ui.exceptions;



import org.example.voice_ui.exceptions.abstract_exception.NotFoundException;
import org.example.voice_ui.exceptions.handler.ErrorCodes;

import java.util.UUID;

public class AccountNotFoundException extends NotFoundException {

    private static final String MESSAGE_ID = "Account with id: %s was not found";
    private static final String MESSAGE_EMAIL = "Account with email: %s was not found";

    public AccountNotFoundException(UUID id) {
        super(String.format(MESSAGE_ID, id), ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    public AccountNotFoundException(String email) {
        super(String.format(MESSAGE_EMAIL, email), ErrorCodes.ACCOUNT_NOT_FOUND);
    }

}
