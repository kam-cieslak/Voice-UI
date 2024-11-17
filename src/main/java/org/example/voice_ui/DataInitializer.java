package org.example.voice_ui;

import lombok.RequiredArgsConstructor;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.document.Score;
import org.example.voice_ui.logic_layer.repositories.AccountRepository;
import org.example.voice_ui.logic_layer.repositories.ScoreRepository;
import org.example.voice_ui.util.RoleEnum;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final ScoreRepository scoreRepository;
    private static final Account account = new Account("charlie.brown", "$2a$10$cZM2GhvetO6fZur/9s26P.alLI.bZmSWfxsrrsLWw4qHlD6F3903y", "kam.miszcz@o2.pl", Set.of(RoleEnum.PLAYER));

    @Override
    public void run(String... args) throws Exception {
        accountRepository.deleteAll();
        scoreRepository.deleteAll();
        Score score = new Score(10, account.getUsername());
        accountRepository.save(account);
        scoreRepository.save(score);
    }
}
