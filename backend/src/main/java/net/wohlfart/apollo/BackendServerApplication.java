package net.wohlfart.apollo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.resources;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@EnableAutoConfiguration
@EnableConfigurationProperties
@ComponentScan(basePackages = {"net.wohlfart.apollo"})
public class BackendServerApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BackendServerApplication.class);
        // app.setWebApplicationType(WebApplicationType.REACTIVE);
        app.run(args);
    }


    /*
    @Bean
    public RouterFunction<ServerResponse> staticResourceRouter() {

        Mono<ClassPathResource> defaultResource = Mono.just(new ClassPathResource("index.html"));


        return RouterFunctions.resources(defaultResource)
            route(GET("/login"), defaultResource);

    }
    */

}
