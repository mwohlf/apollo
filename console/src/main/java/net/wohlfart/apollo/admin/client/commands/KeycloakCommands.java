package net.wohlfart.apollo.admin.client.commands;

import net.wohlfart.apollo.admin.client.AbstractKeycloakCommands;
import net.wohlfart.apollo.admin.client.ConnectionUpdatedEvent;
import net.wohlfart.apollo.admin.client.ConsoleException;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

import javax.ws.rs.NotAuthorizedException;


@ShellComponent
public class KeycloakCommands extends AbstractKeycloakCommands {

    public KeycloakCommands(ApplicationEventPublisher applicationEventPublisher) {
        super(applicationEventPublisher);
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
        if (isConnected()) {
            throw new ConsoleException("client is already connected.");
        }
        Keycloak keycloak =  KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .username(username)
            .password(password)
            .clientId(clientId)
            .resteasyClient(
                new ResteasyClientBuilder()
                    .connectionPoolSize(10).build()
            ).build();
        applicationEventPublisher.publishEvent(new ConnectionUpdatedEvent(this, keycloak));
        try {
            String version = keycloak.serverInfo().getInfo().getSystemInfo().getVersion();
            return "connected to Keycloak, version: " + version;
        } catch (NotAuthorizedException ex) {
            throw new ConsoleException(ex.getMessage());
        }
    }

    @ShellMethod("Initializing Keycloak connection.")
    public String disconnect() {
        checkConnection();
        applicationEventPublisher.publishEvent(new ConnectionUpdatedEvent(this, null));
        return "done";
    }

}
