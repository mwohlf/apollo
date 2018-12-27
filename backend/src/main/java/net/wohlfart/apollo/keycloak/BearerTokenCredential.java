package net.wohlfart.apollo.keycloak;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class BearerTokenCredential {

    @NotNull
    String value;

}
