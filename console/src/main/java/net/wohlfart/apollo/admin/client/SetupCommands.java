package net.wohlfart.apollo.admin.client;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

import javax.ws.rs.NotAuthorizedException;


@ShellComponent
public class SetupCommands {


    private Keycloak kc;

    private void initialize() {
        kc = KeycloakBuilder.builder()
            .serverUrl("http://your.keycloak.domain/auth")
            .realm("master")
            .username("admin")
            .password("secret")
            .clientId("admin-cli")
            .resteasyClient(
                new ResteasyClientBuilder()
                    .connectionPoolSize(10).build()
            ).build();
    }


    @ShellMethod("Initializing Keycloak connection.")
    public String connect(
        @ShellOption(defaultValue = "localhost") String hostname,
        @ShellOption(defaultValue = "8080") String port,
        @ShellOption(defaultValue = "master") String realm,
        @ShellOption(defaultValue = "admin") String username,
        @ShellOption(defaultValue = "Pa55w0rd") String password,
        @ShellOption(defaultValue = "admin-cli") String clientId
    ) {
        String serverUrl = "http://" + hostname + ":" + port + "/auth";
        Keycloak keycloak = ContextHolder.CONTEXT.keycloak;
        if (keycloak != null && !keycloak.isClosed()) {
            throw new ConsoleException("client is already connected and not closed");
        }
        keycloak =  ContextHolder.CONTEXT.keycloak = KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .username(username)
            .password(password)
            .clientId(clientId)
            .resteasyClient(
                new ResteasyClientBuilder()
                    .connectionPoolSize(10).build()
            ).build();
        try {
            String version = keycloak.serverInfo().getInfo().getSystemInfo().getVersion();
            return "connected to Keycloak, version: " + version;
        } catch (NotAuthorizedException ex) {
            throw new ConsoleException(ex.getMessage());
        }
    }

    @ShellMethod("Initializing Keycloak connection.")
    public String disconnect() {
        Keycloak keycloak = ContextHolder.CONTEXT.keycloak;

        if (keycloak == null) {
            throw new ConsoleException("client is not connected");
        }
        if (keycloak.isClosed()) {
            throw new ConsoleException("client is already closed");
        }
        keycloak.close();
        ContextHolder.CONTEXT.keycloak = null;
        return "done";
    }

}
