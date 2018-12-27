package net.wohlfart.apollo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.wohlfart.apollo.keycloak.KeycloakProperties;
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
import org.springframework.context.annotation.Profile;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;



/**
 * setup client and initial user
 *
 */
@Slf4j
@Component
@Profile("keycloak")
@RequiredArgsConstructor
public class KeycloakInitializer implements InitializingBean {

    private final KeycloakProperties keycloakProperties;

    private Keycloak keycloak;

    private RealmRepresentation realmRepresentation;


    @Override
    public void afterPropertiesSet() throws Exception {
        log.info("<afterPropertiesSet>");
        setupKeycloak();
        setupRealmForClient();
        // /auth/realms/{realm}/.well-known/openid-configuration
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
        log.info("<setupClient> for keycloakProperties {}", keycloakProperties);
        Objects.requireNonNull(realmRepresentation, "can't setup client without realm being set up");

        final KeycloakProperties.Client clientProperties = keycloakProperties.getClient();
        ClientRepresentation clientRepresentation = getClientRepresentation(clientProperties.getClientId());

        // make sure the client exists
        if (clientRepresentation == null) {
            clientRepresentation = new ClientRepresentation();
            clientRepresentation.setId(clientProperties.getClientId());
            keycloak.realms().realm(realmRepresentation.getRealm()).clients().create(clientRepresentation);
            clientRepresentation = getClientRepresentation(clientProperties.getClientId());
        }

        Objects.requireNonNull(clientRepresentation, "can't setup client");
        clientRepresentation.setEnabled(true);
        // for flows see: https://alexbilbie.com/guide-to-oauth-2-grants/
        clientRepresentation.setDirectAccessGrantsEnabled(true);  //  resource owner password access grant
        clientRepresentation.setImplicitFlowEnabled(true);
        clientRepresentation.setStandardFlowEnabled(true);
        final ClientResource clientResource = keycloak.realms().realm(realmRepresentation.getRealm()).clients().get(clientRepresentation.getId());
        clientResource.update(clientRepresentation);

        // read client secret if not available
        if (StringUtils.isEmpty(clientProperties.getSecret())) {
            CredentialRepresentation clientSecret = clientResource.getSecret();
            log.info("<setupClient> for clientSecret {}", clientSecret.getValue());
            clientProperties.setSecret(clientSecret.getValue());
        }
    }

    private void setupRealmForClient() {
        log.info("<setupRealmForClient> for keycloakProperties {}", keycloakProperties);
        Objects.requireNonNull(keycloak, "can't setup realm without keycloak being set up");

        final KeycloakProperties.Client clientProperties = keycloakProperties.getClient();
        this.realmRepresentation = getRealmRepresentation(clientProperties.getRealm());

        // make sure the realm exists
        if (this.realmRepresentation == null) {
            RealmRepresentation realmRepresentation = new RealmRepresentation();
            realmRepresentation.setId(clientProperties.getRealm());
            realmRepresentation.setRealm(clientProperties.getRealm());
            keycloak.realms().create(realmRepresentation);
            this.realmRepresentation = getRealmRepresentation(clientProperties.getRealm());
        }

        Objects.requireNonNull(this.realmRepresentation, "can't setup realm");
        // make sure the config is okay
        this.realmRepresentation.setEnabled(true);
        final RealmResource realmResource = keycloak.realms().realm(realmRepresentation.getRealm());
        realmResource.update(this.realmRepresentation);
    }


    private void setupKeycloak() {
        log.info("<setupKeycloak> for keycloakProperties {}", keycloakProperties);

        final KeycloakProperties.Admin adminProperties = keycloakProperties.getAdmin();
        this.keycloak = KeycloakBuilder.builder()
            .serverUrl(keycloakProperties.getServerUrl())
            .realm(adminProperties.getRealm())
            .username(adminProperties.getUsername())
            .password(adminProperties.getPassword())
            .clientId(adminProperties.getClientId())
            .resteasyClient(
                new ResteasyClientBuilder()
                    .connectionPoolSize(adminProperties.getPoolSize())
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
