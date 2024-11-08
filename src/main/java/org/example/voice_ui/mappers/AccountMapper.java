package org.example.voice_ui.mappers;

import org.example.voice_ui.auth.dto.create.CreateAccountDTO;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.dto.get.GetAccountDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    @Mapping(source = "email", target = "personalData.email")
    @Mapping(source = "firstName", target = "personalData.firstName")
    @Mapping(source = "lastName", target = "personalData.lastName")
    @Mapping(source = "gender", target="personalData.gender")
    Account mapCreateAccountDTOToAccount(CreateAccountDTO createAccountDTO);

    @Mapping(source = "personalData.email", target = "email")
    @Mapping(source = "personalData.firstName", target = "firstName")
    @Mapping(source = "personalData.lastName", target = "lastName")
    @Mapping(source = "personalData.gender", target="gender")
    CreateAccountDTO mapAccountToCreateAccountDTO(Account account);

    @Mapping(source = "personalData.email", target = "email")
    @Mapping(source = "personalData.firstName", target = "firstName")
    @Mapping(source = "personalData.lastName", target = "lastName")
    @Mapping(source = "personalData.gender", target="gender")
    GetAccountDTO mapAccountToGetAccountDTO(Account account);

}
