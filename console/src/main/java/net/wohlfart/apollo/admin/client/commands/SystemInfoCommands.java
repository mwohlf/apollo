package net.wohlfart.apollo.admin.client.commands;

import net.wohlfart.apollo.admin.client.AbstractKeycloakCommands;
import org.keycloak.representations.idm.RealmRepresentation;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.util.List;

@ShellComponent
public class SystemInfoCommands extends AbstractKeycloakCommands {


    public SystemInfoCommands(ApplicationEventPublisher applicationEventPublisher) {
        super(applicationEventPublisher);
    }

    @ShellMethod("Show Keycloak verion string.")
    public String version() {
        checkConnection();
        return keycloak.serverInfo().getInfo().getSystemInfo().getVersion();
    }

    @ShellMethod("Show Keycloak verion string.")
    public String realms() {
        checkConnection();
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{");
        List<RealmRepresentation> realms = keycloak.realms().findAll();
        if (realms.size() > 0) {
            stringBuilder.append(realms.get(0).getDisplayName());
        }
        for (int i = 1; i < realms.size(); i++) {
            stringBuilder.append(", ");
            stringBuilder.append(realms.get(i).getDisplayName());
        }
        stringBuilder.append("}");
        return stringBuilder.toString();
    }

}
