package org.example.voice_ui.mappers;

import org.example.voice_ui.auth.dto.create.CreateAccountDTO;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.dto.get.GetAccountDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    Account mapCreateAccountDTOToAccount(CreateAccountDTO createAccountDTO);

    CreateAccountDTO mapAccountToCreateAccountDTO(Account account);

    GetAccountDTO mapAccountToGetAccountDTO(Account account);

}
