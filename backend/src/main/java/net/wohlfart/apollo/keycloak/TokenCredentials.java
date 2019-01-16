package net.wohlfart.apollo.keycloak;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class TokenCredentials {

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String accessToken;

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String refreshToken;

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String error;

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String errorMessage;

}
