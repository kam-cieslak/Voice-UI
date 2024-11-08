package org.example.voice_ui.auth.services;


import org.example.voice_ui.auth.dto.LoginDTOResponse;
import org.example.voice_ui.auth.dto.create.CreateAccountDTO;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.exceptions.AccountNotFoundException;
import org.example.voice_ui.exceptions.InvalidCredentialsException;

public interface AuthService {

    Account create(CreateAccountDTO account) throws AccountNotFoundException;

    LoginDTOResponse signIn(String login, String password) throws InvalidCredentialsException;
}
