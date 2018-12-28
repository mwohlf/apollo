package net.wohlfart.apollo.config;

import org.springframework.http.HttpMethod;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class IndexWebFilter implements WebFilter {

    private static final Set<String> PATHS = new HashSet<>(Arrays.asList(
        "/",
        "/login"
    ));

    private static final String SPA_URI = "/index.html";


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        final HttpMethod method = exchange.getRequest().getMethod();
        if (!HttpMethod.GET.equals(method)) {
            return chain.filter(exchange);
        }

        final String currentPath = exchange.getRequest().getURI().getPath();
        if (!PATHS.contains(currentPath)) {
            return chain.filter(exchange);
        }

        final ServerHttpRequest request = exchange.getRequest().mutate().path(SPA_URI).build();
        final ServerWebExchange newExchange = exchange.mutate().request(request).build();
        return chain.filter(newExchange);
    }

}
