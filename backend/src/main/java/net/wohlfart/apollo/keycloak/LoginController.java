package net.wohlfart.apollo.keycloak;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.util.Assert;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

import static net.wohlfart.apollo.config.SecurityConfig.API;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "login-controller")
public class LoginController {

    public static final Set<String> LOGIN_ALLOWED_KEY = new HashSet<>();

    public static final String GRANT_TYPE_PASSWORD = "password";

    public static final String LOGIN_ENDPOINT = API + "/login";

    private final KeycloakProperties keycloakProperties;

    @ApiOperation(value = "get application config data", response = TokenCredentials.class)
    @PostMapping(path = LoginController.LOGIN_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<TokenCredentials> authenticate(@RequestBody UserCredentials authentication) {
        log.info("<authenticate> authentication:" + authentication);
        final KeycloakProperties.Client client = keycloakProperties.getClient();
        Assert.notNull(client, "client must not be null");
        // "Direct Access Grants Enabled" must be set to true
        // https://stackoverflow.com/questions/28658735/what-are-keycloaks-oauth2-openid-connect-endpoints
        //   "token_endpoint": "http://localhost:8080/auth/realms/demo/protocol/openid-connect/token",
        // curl example:
        //    https://www.keycloak.org/docs/latest/securing_apps/index.html#flows
        final WebClient webClient = WebClient.create(keycloakProperties.getServerUrl());
        LinkedMultiValueMap<String, String> linkedMultiValueMap = new LinkedMultiValueMap<>();
        linkedMultiValueMap.add("client_id", client.getClientId());
        linkedMultiValueMap.add("client_secret", client.getSecret()); // needed for access type confidential
        linkedMultiValueMap.add("username", authentication.getUsername());
        linkedMultiValueMap.add("password", authentication.getPassword());
        linkedMultiValueMap.add("grant_type", GRANT_TYPE_PASSWORD);

        log.info("<authenticate> client.getSecret() " + client.getSecret());
        log.info("<authenticate> keycloakProperties.getServerUrl() " + keycloakProperties.getServerUrl());
        // final String uri = tokenEndpoint(client);
        final String uri = tokenEndpoint(client);
        log.info("<authenticate> uri " + uri);


        final Mono<TokenCredentials> result = webClient
            .post()
            .uri(uri)
            .body(BodyInserters.fromFormData(linkedMultiValueMap))
            .accept(MediaType.APPLICATION_JSON_UTF8)
            .exchange()
            .flatMap(response -> {
                log.info("<response> " + response);
                log.info("<response> statusCode " + response.statusCode());
                return response.bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {});
            })
            .flatMap(map -> {
                log.info("<response> " + map);
                return Mono.just(filter(map));
            });
        return result;
    }

    private TokenCredentials filter(Map<String, String> map) {
        final TokenCredentials result = new TokenCredentials();
        if (map.containsKey("access_token") && map.containsKey("refresh_token")) {
            result.setAccessToken(map.get("access_token"));
            result.setRefreshToken(map.get("refresh_token"));
        } else if (map.containsKey("error") && map.containsKey("error_message")) {
            result.setError(map.get("error"));
            result.setErrorMessage(map.get("error_message"));
        } else {
            log.warn("invalid auth response: {}, ant find token", map);
            result.setError("no token");
            result.setErrorMessage("Login failes, no token returned from server.");
        }
        return result;
    }

    private String tokenEndpoint(KeycloakProperties.Client client) {
        return "/realms/" + client.getRealm() + "/protocol/openid-connect/token";
    }

    private String authEndpoint(KeycloakProperties.Client client) {
        return "/realms/" + client.getRealm() + "/protocol/openid-connect/auth";
    }

}
