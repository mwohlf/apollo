package net.wohlfart.apollo.admin.client.commands;

import net.wohlfart.apollo.admin.client.AbstractKeycloakCommands;
import org.keycloak.representations.idm.RealmRepresentation;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;


@ShellComponent
public class RealmCommands extends AbstractKeycloakCommands {

    public RealmCommands(ApplicationEventPublisher applicationEventPublisher) {
        super(applicationEventPublisher);
    }

    @ShellMethod(key="addRealm", value = "Add a realm.")
    public String addRealm(
        @ShellOption(defaultValue = "newRealm") String displayName
    ) {
        checkConnection();

        RealmRepresentation realmRepresentation = new RealmRepresentation();
        realmRepresentation.setDisplayName(displayName);
        realmRepresentation.setDisplayName(displayName);
        keycloak.realms().create(realmRepresentation);
        return "created " + displayName;
    }

}
