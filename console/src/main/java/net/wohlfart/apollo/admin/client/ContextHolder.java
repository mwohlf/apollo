package net.wohlfart.apollo.admin.client;

import org.keycloak.admin.client.Keycloak;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ContextHolder {

    private Keycloak keycloak;

    @EventListener
    public void handle(ConnectionUpdatedEvent connectionUpdatedEvent) {
        keycloak = connectionUpdatedEvent.getKeycloak();
    }

}
