package net.wohlfart.apollo.admin.client;

import org.jline.utils.AttributedString;
import org.jline.utils.AttributedStyle;
import org.keycloak.admin.client.Keycloak;
import org.springframework.context.event.EventListener;
import org.springframework.shell.jline.PromptProvider;
import org.springframework.stereotype.Component;

@Component
public class CustomPromptProvider implements PromptProvider {

    @Override
    public AttributedString getPrompt() {
        Keycloak keycloak = ContextHolder.CONTEXT.keycloak;
        if (keycloak != null) {
            return new AttributedString("keycloak> ",
                AttributedStyle.DEFAULT.foreground(AttributedStyle.YELLOW));
        }
        else {
            return new AttributedString("> ",
                AttributedStyle.DEFAULT.foreground(AttributedStyle.RED));
        }
    }

    @EventListener
    public void handle(ConnectionUpdatedEvent event) {
        // this.connection = event.getConnectionDetails();
    }

}
