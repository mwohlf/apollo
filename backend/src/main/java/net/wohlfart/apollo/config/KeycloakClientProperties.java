package net.wohlfart.apollo.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "keycloak.client")
public class KeycloakClientProperties {

    private String realmId = "apollo";

    private String clientId = "apollo-backend";

}
