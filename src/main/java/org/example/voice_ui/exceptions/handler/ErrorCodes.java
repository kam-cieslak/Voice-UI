package org.example.voice_ui.exceptions.handler;

public enum ErrorCodes {
    // Authentication Errors
    INVALID_LOGIN_DATA,

    // User Status and Verification Errors
    ACCOUNT_NOT_FOUND,
    ACCOUNT_IS_BLOCKED,
    ACCOUNT_NOT_VERIFIED,
    INVALID_RESET_PASSWORD_DATA,

    // ACCOUNT
    WRONG_PASSWORD,
    MAIL_EXISTS,
    USERNAME_EXISTS,

    // TOKEN
    INVALID_CONFIRM_TOKEN,
    CONFIRM_TOKEN_EXPIRED,

    // Server and Resource Errors
    INTERNAL_SERVER_ERROR,
    OPTIMISTIC_LOCK,
    CONFLICT,
    MAIL_ERROR,

    // Validation and Data Errors
    VALIDATION_ERROR,
    ROLLBACK,
    UNEXPECTED_ROLLBACK,
    TRANSACTION_ERROR,
    INVALID_FILTRATION_DATA,

    // GENERAL
    SOMETHING_WENT_WRONG, ROLE_REQUEST_NOT_FOUND,
}

