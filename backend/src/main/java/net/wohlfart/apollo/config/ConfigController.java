package net.wohlfart.apollo.config;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import static net.wohlfart.apollo.config.SecurityConfig.API;

@RestController
@RequiredArgsConstructor
@Api(tags = "config-controller")
public class ConfigController {

    public static final String CONFIG_ENDPOINT = API + "/config";

    @ApiOperation(value = "get application config data", response = ApplicationProperties.class)
    @GetMapping(path = CONFIG_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ApplicationProperties> getApplicationProperties() {
        return Mono.just(ApplicationProperties.builder().streamSse("/sse").build());
    }

}
