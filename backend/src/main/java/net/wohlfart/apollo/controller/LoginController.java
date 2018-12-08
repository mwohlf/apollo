package net.wohlfart.apollo.controller;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.wohlfart.apollo.keycloak.KeycloakProperties;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ServerWebExchange;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.constraints.NotNull;

import static net.wohlfart.apollo.config.WebSecurityConfig.API;


@Api
@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {

    public static final String LOGIN_ENDPOINT = API + "/login";

    private final KeycloakProperties keycloakProperties;


    @PostMapping(path = LoginController.LOGIN_ENDPOINT, produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public BearerTokenCredential authenticate(@ApiIgnore  ServerWebExchange exchange,
                                              @RequestBody UsernamePasswordCredential authentication) {
        log.info("<authenticate> authentication:" + authentication);
        log.info("<authenticate> exchange:" + exchange);

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

        return null;
    }


    @Data
    public static class UsernamePasswordCredential {

        @NotNull
        String useranme;

        @NotNull
        String password;

    }

    @Data
    @AllArgsConstructor
    public static class BearerTokenCredential {

        @NotNull
        String value;

    }

}
