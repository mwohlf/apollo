package net.wohlfart.apollo.admin.client;

import org.keycloak.admin.client.Keycloak;
import org.springframework.context.ApplicationEvent;

public class ConnectionUpdatedEvent extends ApplicationEvent {

    private Keycloak keycloak;

    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public ConnectionUpdatedEvent(Object source, Keycloak keycloak) {
        super(source);
        this.keycloak = keycloak;
    }

    public Keycloak getKeycloak() {
        return keycloak;
    }

}
