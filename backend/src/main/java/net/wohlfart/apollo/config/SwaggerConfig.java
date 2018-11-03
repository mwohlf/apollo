package net.wohlfart.apollo.config;


import com.fasterxml.classmate.TypeResolver;
import com.google.common.collect.Sets;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.OAuth;
import springfox.documentation.service.ResourceOwnerPasswordCredentialsGrant;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebFlux;

import java.security.Principal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;



// see: https://github.com/springfox/springfox/blob/master/springfox-spring-config/src/main/java/springfox/springconfig/Swagger2SpringBoot.java
// see: http://www.baeldung.com/swagger-2-documentation-for-spring-rest-api
// see: http://localhost:8080/swagger-resources
// see: http://localhost:8080/swagger-ui.html#/

@Configuration
@EnableSwagger2WebFlux
@RequiredArgsConstructor
public class SwaggerConfig {

    private final TypeResolver typeResolver;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(new ApiInfoBuilder()
                .title("Apollo Portal Backend")
                .version("0.0.1")
                .build()
            )
            // .additionalModels(typeResolver.resolve(RestError.class))
            .select()
            // only add endpoints with @RestController
            .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
            .paths(PathSelectors.any())
            .build()
            .pathMapping("/")
            // security scheme
            .securitySchemes(securitySchemes())
            .produces(Sets.newHashSet(APPLICATION_JSON_VALUE))
            .consumes(Sets.newHashSet(APPLICATION_JSON_VALUE))
            .forCodeGeneration(true)
            // ignore Spring-Boot's auth classes for code generation
            .ignoredParameterTypes(Principal.class)
            // .ignoredParameterTypes(Authentication.class)
            ;
    }

    // TODO: this is still work in progress....
    private List<SecurityScheme> securitySchemes() {
        return Arrays.asList(new SecurityScheme[] {
            new OAuth(
                "oauth2",
                // Collections.emptyList(),
                Collections.singletonList(new AuthorizationScope("Apoollo", "Apoollo API")),
                Collections.singletonList(new ResourceOwnerPasswordCredentialsGrant("http://apollo:8080/auth")) // or: authorization_code, implicit, application
            ),
        });
    }

}


