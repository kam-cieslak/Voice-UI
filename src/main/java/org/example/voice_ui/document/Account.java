package org.example.voice_ui.document;


import lombok.*;
import org.example.voice_ui.util.RoleEnum;
import org.example.voice_ui.util.validator.Password;
import org.example.voice_ui.util.validator.Username;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Document
@AllArgsConstructor
public class Account extends AbstractDocument {

    @Username
    @EqualsAndHashCode.Include
    @Indexed(unique = true)
    private String username;

    @ToString.Exclude
    private String password;

    private PersonalData personalData;

    @Setter(AccessLevel.NONE)
    private Set<RoleEnum> roles;

    public void addRole(RoleEnum roleEnum) {
        if (roles == null) {
            roles = new HashSet<>();
        }
        roles.add(roleEnum);
    }

    public void removeRole(RoleEnum roleEnum) {
        roles.remove(roleEnum);
    }

}
