package net.wohlfart.apollo.controller;

import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@Controller
public class IndexController {

    /*
     * angular single page subpages mapping
     * this is a redirect but should be a proxy to the index.html
     */
    @GetMapping(path = {"", "/", "/page1", "/page2", "/page3"})
    public Mono<Void> index(@ApiParam(hidden = true) ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.PRECONDITION_FAILED);
        response.getHeaders().add(HttpHeaders.LOCATION, "/index.html");
        return response.setComplete();
    }

}
