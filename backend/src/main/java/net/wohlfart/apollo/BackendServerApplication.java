package net.wohlfart.apollo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.reactive.config.EnableWebFlux;

@EnableWebFlux
@EnableAutoConfiguration
@EnableConfigurationProperties
@ComponentScan(basePackages = {"net.wohlfart.apollo"})
public class BackendServerApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BackendServerApplication.class);
        // app.setWebApplicationType(WebApplicationType.REACTIVE);
        app.run(args);
    }

}
