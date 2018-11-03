package net.wohlfart.apollo.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.ClientResource;
import org.keycloak.admin.client.resource.ClientsResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
public class KeycloakInitializer implements InitializingBean {

    private final KeycloakAdminProperties keycloakAdminClientProperties;

    private final KeycloakClientProperties keycloakRealmProperties;

    private Keycloak keycloak;

    private RealmRepresentation realmRepresentation;

    private ClientRepresentation clientRepresentation;


    @Override
    public void afterPropertiesSet() throws Exception {
        log.info("<afterPropertiesSet>");
        setupKeycloak();
        setupRealm();
        setupClient();
        setupTestUsers();
    }

    private void setupTestUsers() {
        setupTestUser("test1", "Test1");
    }

    private void setupTestUser(String username, String password) {
        log.info("<setupTestUser> {}/{}", username, password);

        UserRepresentation user = getUserRepresentation(username);
        if (user == null) {
            log.error("skipped user creation");
            return;
        }

        final RealmResource realmResource = keycloak.realms().realm(realmRepresentation.getRealm());

        UserResource userResource = realmResource.users().get(user.getId());
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(password);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setTemporary(false);
        userResource.resetPassword(credentialRepresentation);

        user = getUserRepresentation(username);
        if (user == null) {
            log.error("skipped user update for {}", username);
            return;
        }

        user.setEnabled(true);
        userResource.update(user);
    }

    private UserRepresentation getUserRepresentation(String username) {
        final RealmResource realmResource = keycloak.realms().realm(realmRepresentation.getRealm());
        List<UserRepresentation> users = realmResource.users().search(username);
        if (users.size() > 1) {
            log.error("multiple user with username {} found, ignoring", username);
            return null;
        }
        if (users.size() == 1) {
            return users.get(0);
        }

        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(username);
        realmResource.users().create(userRepresentation);
        users = realmResource.users().search(username);
        if (users.size() != 1) {
            log.error("unable to create user {} ignoring, size: {}", username, users.size());
            return null;
        }
        return users.get(0);
    }

    private void setupClient() {
        log.info("<setupClient> for keycloakAdminClientProperties {}", keycloakAdminClientProperties);
        Objects.requireNonNull(realmRepresentation, "can't setup client without realm being set up");

        this.clientRepresentation = getClientRepresentation(keycloakRealmProperties.getClientId());

        // make sure the client exists
        if (this.clientRepresentation == null) {
            ClientRepresentation clientRepresentation = new ClientRepresentation();
            clientRepresentation.setId(keycloakRealmProperties.getClientId());
            keycloak.realms().realm(realmRepresentation.getRealm()).clients().create(clientRepresentation);
            this.clientRepresentation = getClientRepresentation(keycloakRealmProperties.getClientId());
        }

        Objects.requireNonNull(this.clientRepresentation, "can't setup client");
        this.clientRepresentation.setEnabled(true);
        // for flows see: https://alexbilbie.com/guide-to-oauth-2-grants/
        this.clientRepresentation.setDirectAccessGrantsEnabled(true);
        this.clientRepresentation.setImplicitFlowEnabled(true);
        this.clientRepresentation.setStandardFlowEnabled(true);
        final ClientResource clientResource = keycloak.realms().realm(realmRepresentation.getRealm()).clients().get(this.clientRepresentation.getId());
        clientResource.update(this.clientRepresentation);
    }

    private void setupRealm() {
        log.info("<setupRealm> for keycloakAdminClientProperties {}", keycloakAdminClientProperties);
        Objects.requireNonNull(keycloak, "can't setup realm without keycloak being set up");

        this.realmRepresentation = getRealmRepresentation(keycloakRealmProperties.getRealmId());

        // make sure the realm exists
        if (this.realmRepresentation == null) {
            RealmRepresentation realmRepresentation = new RealmRepresentation();
            realmRepresentation.setId(keycloakRealmProperties.getRealmId());
            realmRepresentation.setRealm(keycloakRealmProperties.getRealmId());
            keycloak.realms().create(realmRepresentation);
            this.realmRepresentation = getRealmRepresentation(keycloakRealmProperties.getRealmId());
        }

        Objects.requireNonNull(this.realmRepresentation, "can't setup realm");
        // make sure the config is okay
        this.realmRepresentation.setEnabled(true);
        final RealmResource realmResource = keycloak.realms().realm(realmRepresentation.getRealm());
        realmResource.update(this.realmRepresentation);
    }


    private void setupKeycloak() {
        log.info("<setupKeycloak> for keycloakAdminClientProperties {}", keycloakAdminClientProperties);
        this.keycloak = KeycloakBuilder.builder()
            .serverUrl(keycloakAdminClientProperties.getServerUrl())
            .realm(keycloakAdminClientProperties.getRealm())
            .username(keycloakAdminClientProperties.getUsername())
            .password(keycloakAdminClientProperties.getPassword())
            .clientId(keycloakAdminClientProperties.getClientId())
            .resteasyClient(
                new ResteasyClientBuilder()
                    .connectionPoolSize(keycloakAdminClientProperties.getPoolSize())
                    .build()
            ).build();
    }

    @Nullable
    private RealmRepresentation getRealmRepresentation(String realm) {
        final List<RealmRepresentation> realms = this.keycloak.realms().findAll();
        for (RealmRepresentation realmRepresentation : realms) {
            if (realm.equals(realmRepresentation.getRealm())) {
                return realmRepresentation;
            }
        }
        return null;
    }

    @Nullable
    private ClientRepresentation getClientRepresentation(String clientId) {
        final ClientsResource allClients = this.keycloak.realm(realmRepresentation.getRealm()).clients();
        final List<ClientRepresentation> clients = allClients.findAll();
        if (clients != null) {
            for (ClientRepresentation clientRepresentation : clients) {
                if (clientId.equals(clientRepresentation.getId())) {
                    return clientRepresentation;
                }
            }
        }
        return null;
    }

}
