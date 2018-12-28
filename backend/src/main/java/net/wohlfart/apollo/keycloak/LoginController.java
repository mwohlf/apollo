package net.wohlfart.apollo.keycloak;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import static net.wohlfart.apollo.config.SecurityConfig.API;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "login-controller")
public class LoginController {

    public static final String LOGIN_ENDPOINT = API + "/login";

    private final KeycloakProperties keycloakProperties;

    @ApiOperation(value = "get application config data", response = BearerTokenCredential.class)
    @PostMapping(path = LoginController.LOGIN_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<BearerTokenCredential> authenticate(@RequestBody UsernamePasswordCredential authentication) {
        log.info("<authenticate> authentication:" + authentication);

        /*
        final KeycloakProperties.Client client = keycloakProperties.getClient();
        // https://stackoverflow.com/questions/28658735/what-are-keycloaks-oauth2-openid-connect-endpoints
        //   "token_endpoint": "http://localhost:8080/auth/realms/demo/protocol/openid-connect/token",
        final WebClient webClient = WebClient.create(keycloakProperties.getServerUrl());
        LinkedMultiValueMap<String, String> linkedMultiValueMap = new LinkedMultiValueMap<>();
        linkedMultiValueMap.add("client_id", client.getClientId());
        linkedMultiValueMap.add("client_secret", client.getSecret());
        linkedMultiValueMap.add("username", client.getUsername());
        linkedMultiValueMap.add("password", client.getPassword());
        linkedMultiValueMap.add("grant_type", "password");
        return webClient
            .post()
            .uri("realms/" + client.getRealm() + "/protocol/openid-connect/token")
            .body(BodyInserters.fromFormData(linkedMultiValueMap))
            .accept(APPLICATION_JSON)
            .exchange()
            .map()
            ;

        // return Mono.just(new BearerTokenCredential("token"));
        */

        return Mono.just(BearerTokenCredential.builder().value("tokenvalue").build());
    }

}
