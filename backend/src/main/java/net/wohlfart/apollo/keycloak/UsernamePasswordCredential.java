package net.wohlfart.apollo.keycloak;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UsernamePasswordCredential {

    @NotNull
    String useranme;

    @NotNull
    String password;

}
