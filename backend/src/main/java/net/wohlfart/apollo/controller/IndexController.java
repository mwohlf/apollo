package net.wohlfart.apollo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.result.view.Rendering;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.URI;


// @Api
@Controller
public class IndexController {
// serve index.html for all routes, see: https://stackoverflow.com/questions/31415052/angular-2-0-router-not-working-on-reloading-the-browser

    /*
     * angular single page subpages mapping
     * this is a redirect but should be a proxy to the index.html
     */
    @GetMapping(path = {"", "/", "/page1", "/page2", "/page3"})
    public Mono<Void> index(ServerWebExchange exchange) {
      ServerHttpResponse response = exchange.getResponse();
      response.setStatusCode(HttpStatus.PRECONDITION_FAILED);
      response.getHeaders().add(HttpHeaders.LOCATION, "/index.html");
      return response.setComplete();
      // Rendering.redirectTo("abc").build()
      //  return ServerResponse.temporaryRedirect(URI.create("index.html")).build();
    }

}
