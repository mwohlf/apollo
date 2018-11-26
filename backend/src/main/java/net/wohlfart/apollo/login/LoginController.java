package net.wohlfart.apollo.login;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.constraints.NotNull;


@Api
@Controller
public class LoginController {

    public static final String LOGIN_ENDPOINT = "/login";


    @PostMapping(path = LoginController.LOGIN_ENDPOINT, produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Mono<BearerTokenCredential> authenticate(@ApiIgnore  ServerWebExchange exchange,
                                                    @RequestBody UsernamePasswordCredential authentication) {

        return Mono.just(new BearerTokenCredential("token"));
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
