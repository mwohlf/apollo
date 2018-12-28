package net.wohlfart.apollo.config;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Flux;

import static net.wohlfart.apollo.config.SecurityConfig.API;


@Controller
@RequiredArgsConstructor
@Api(tags = "config-controller")
public class ConfigController {

    public static final String CONFIG_ENDPOINT = API + "/config";

    @ApiOperation(value = "get application config data", response = ApplicationProperties.class)
    @GetMapping(path = CONFIG_ENDPOINT)
    public Flux<ApplicationProperties> getApplicationProperties() {
        return Flux.just(ApplicationProperties.builder().build());
    }



}
