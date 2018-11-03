package net.wohlfart.apollo.config;

import io.swagger.annotations.Api;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import net.wohlfart.apollo.controller.EventController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static net.wohlfart.apollo.config.WebSecurityConfig.API;


@Api
@Controller
@RequiredArgsConstructor
public class ConfigController {

    public static final String CONFIG_ENDPOINT = API + "/config";

    final KeycloakClientProperties keycloakClientProperties;


    @GetMapping(path = CONFIG_ENDPOINT)
    public ResponseEntity<ApplicationProperties> config() {
        return new ResponseEntity<>(
            ApplicationProperties.builder()
                .streamSse(EventController.STREAM_SSE_ENDPOINT)
                .build(),
            HttpStatus.OK);
    }


    @Data
    @Builder
    public static class ApplicationProperties {

        String streamSse;

    }

}
