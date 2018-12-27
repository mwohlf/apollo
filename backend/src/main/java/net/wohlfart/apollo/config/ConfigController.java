package net.wohlfart.apollo.config;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import static net.wohlfart.apollo.config.SecurityConfig.API;


@Api
@RestController
@RequiredArgsConstructor
public class ConfigController {

    public static final String CONFIG_ENDPOINT = API + "/config";


    @ApiOperation(value = "Submit new foo", response = ApplicationProperties.class)
    @ApiResponse(code = 201, message = "Foo was created")
    @GetMapping(path = CONFIG_ENDPOINT)
    public Flux<ApplicationProperties> getConfig() {
        return Flux.just(ConfigController.ApplicationProperties.builder().build());
    }


    @Data
    @Builder
    public static class ApplicationProperties {

        String streamSse;

    }

}
