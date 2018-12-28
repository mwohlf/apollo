package net.wohlfart.apollo.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
public class BearerTokenCredential {

    @NotNull
    String value;

}
