package net.wohlfart.apollo.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "keycloak.admin")
public class KeycloakAdminProperties {

    private String serverUrl = "http://localhost:8081/auth";

    private String realm = "admin";

    private String username = "admin";

    private String password = "s3cr37";

    private String clientId = "admin-cli";

    private int poolSize = 10;

}
