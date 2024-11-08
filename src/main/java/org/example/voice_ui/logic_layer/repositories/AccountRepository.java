package org.example.voice_ui.logic_layer.repositories;

import org.example.voice_ui.document.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Optional<Account> findByUsername(String username);

    Optional <Account> findByPersonalData_Email(String email);
}
