package net.wohlfart.apollo.login;

import io.swagger.annotations.Api;
import lombok.Data;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;


@Api
@Controller
public class LoginController {
// serve index.html for all routes, see: https://stackoverflow.com/questions/31415052/angular-2-0-router-not-working-on-reloading-the-browser

    /*
     * angular single page subpages mapping
     * this is a redirect but should be a proxy to the index.html

     */
    @PostMapping(path = {"/login"})
    public Mono<Void> authenticate(@ApiIgnore  ServerWebExchange exchange, @RequestBody Authentication authentication) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.PRECONDITION_FAILED);
        response.getHeaders().add(HttpHeaders.LOCATION, "/index.html");
        return response.setComplete();
        // Rendering.redirectTo("abc").build()
        //  return ServerResponse.temporaryRedirect(URI.create("index.html")).build();
    }



    @Data
    public static class Authentication {

        String useranme;

        String password;

    }

}
