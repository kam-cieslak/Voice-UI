package org.example.voice_ui;

import lombok.RequiredArgsConstructor;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.document.PersonalData;
import org.example.voice_ui.logic_layer.repositories.AccountRepository;
import org.example.voice_ui.util.RoleEnum;
import org.example.voice_ui.util._enum.GenderEnum;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private static final PersonalData personalData = new PersonalData("john.doe@example", GenderEnum.MALE, "John", "Doe");
    private static final Account account = new Account("charlie.brown", "$2a$10$cZM2GhvetO6fZur/9s26P.alLI.bZmSWfxsrrsLWw4qHlD6F3903y", personalData, Set.of(RoleEnum.PLAYER));

    @Override
    public void run(String... args) throws Exception {
        accountRepository.deleteAll();
        accountRepository.save(account);
    }
}
