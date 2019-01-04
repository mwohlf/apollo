package net.wohlfart.apollo.keycloak;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UsernamePasswordCredential {

    @NotNull
    String username;

    @NotNull
    String password;

}
