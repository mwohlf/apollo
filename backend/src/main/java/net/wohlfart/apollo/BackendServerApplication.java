package net.wohlfart.apollo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

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
