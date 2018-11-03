package net.wohlfart.apollo.controller;

import io.swagger.annotations.Api;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalTime;

import static net.wohlfart.apollo.config.WebSecurityConfig.API;


@Api
@Controller
public class EventController {

    public static final String STREAM_SSE_ENDPOINT = API + "/stream-sse";


    @GetMapping(path=EventController.STREAM_SSE_ENDPOINT, produces=MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> streamEvents() {
        return Flux.interval(Duration.ofSeconds(1))
            .map(sequence -> ServerSentEvent.<String> builder()
                .id(String.valueOf(sequence))
                .event("periodic-event")
                .data("SSE - " + LocalTime.now().toString())
                .build());
    }


}
