package org.example.voice_ui.exceptions;



import org.example.voice_ui.exceptions.abstract_exception.NotFoundException;
import org.example.voice_ui.exceptions.handler.ErrorCodes;

import java.util.UUID;

public class AccountNotFoundException extends NotFoundException {

    private static final String MESSAGE_ID = "Account with id: %s was not found";
    private static final String MESSAGE_USERNAME = "Account with username: %s was not found";

    public AccountNotFoundException(UUID id) {
        super(String.format(MESSAGE_ID, id), ErrorCodes.ACCOUNT_NOT_FOUND);
    }

    public AccountNotFoundException(String username) {
        super(String.format(MESSAGE_USERNAME, username), ErrorCodes.ACCOUNT_NOT_FOUND);
    }

}
