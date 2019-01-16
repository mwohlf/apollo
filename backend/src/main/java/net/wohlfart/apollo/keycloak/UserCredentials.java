package net.wohlfart.apollo.keycloak;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UserCredentials {

    @NotNull
    String username;

    @NotNull
    String password;

}
