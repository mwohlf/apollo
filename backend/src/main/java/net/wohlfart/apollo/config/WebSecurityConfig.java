package net.wohlfart.apollo.config;

import net.wohlfart.apollo.login.LoginController;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class WebSecurityConfig {

    public static final String CATCH_ALL = "/**";

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.csrf().disable()
            .authorizeExchange()
            .pathMatchers(HttpMethod.POST, LoginController.LOGIN_ENDPOINT).permitAll()
            .pathMatchers(WebSecurityConfig.CATCH_ALL).permitAll()
            .and()
            .httpBasic();
        return http.build();
    }
}
