package net.wohlfart.apollo.admin.client;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

import javax.ws.rs.NotAuthorizedException;


abstract public class AbstractKeycloakCommands {

    protected final ApplicationEventPublisher applicationEventPublisher;

    protected Keycloak keycloak;

    public AbstractKeycloakCommands(ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @EventListener
    public void handle(ConnectionUpdatedEvent connectionUpdatedEvent) {
        this.keycloak = connectionUpdatedEvent.getKeycloak();
    }

    protected boolean isConnected() {
        return keycloak != null && !keycloak.isClosed();
    }

    protected void checkConnection() {
        if (!isConnected()) {
            throw new ConsoleException("client is anot connected, use the connect command to connect to a keycloak instance");
        }
    }

}
