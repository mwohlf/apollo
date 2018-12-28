package net.wohlfart.apollo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.ResourceHandlerRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.resource.WebJarsResourceResolver;

@Configuration
public class RouteConfiguration implements WebFluxConfigurer {

    /*
    @Bean
    RouterFunction<ServerResponse> staticResourceRouter() {
        return resources("/**", new ClassPathResource("resources/"));
    }
    */

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/webjars/**")
            .addResourceLocations("/webjars/")
            .resourceChain(true)
            .addResolver(new WebJarsResourceResolver());    }

}
