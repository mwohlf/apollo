package net.wohlfart.apollo.keycloak;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "authentication", ignoreUnknownFields=true)
public class KeycloakProperties {

    private String serverUrl;

    @NestedConfigurationProperty
    private Admin admin;

    @NestedConfigurationProperty
    private Client client;

    @Data
    public static class Admin {

        private String realm ;

        private String username ;

        private String password;

        private String clientId;

        private int poolSize = 5;

    }

    @Data
    public static class Client {

        private String realm;

        private String username;

        private String password;

        private String clientId;

        private String secret;

        private String tokenEndpoint;

    }

}
