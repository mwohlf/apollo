package net.wohlfart.apollo.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE) // -2
public class GlobalErrorWebExceptionHandler implements ErrorWebExceptionHandler {

    // TODO: implement exception handling
    // see: https://stackoverflow.com/questions/45211431/webexceptionhandler-how-to-write-a-body-with-spring-webflux
    @Override
    public Mono<Void> handle(@NonNull ServerWebExchange exchange, @NonNull Throwable ex) {
        log.error("<error> exchange: " + exchange);
        log.error("<error> ex: ", ex);
        exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
        return Mono.empty();
    }

}
