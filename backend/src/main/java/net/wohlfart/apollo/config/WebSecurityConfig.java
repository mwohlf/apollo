package net.wohlfart.apollo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class WebSecurityConfig {

    public static final String CATCH_ALL = "/**";

    public static final String API = "/api";



    @Bean
    public MapReactiveUserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("test1")
            .password("Test1")
            .roles("USER")
            .build();
        return new MapReactiveUserDetailsService(user);
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .authorizeExchange()
            .anyExchange().authenticated()
            .and()
            .httpBasic().and()
            .formLogin();
        return http.build();
    }


    /*
    @Bean
    @Profile("keycloak")
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.csrf().disable()
            .authorizeExchange()
            .pathMatchers(HttpMethod.POST, LoginController.LOGIN_ENDPOINT).permitAll()
            .pathMatchers(WebSecurityConfig.API).permitAll()
            .pathMatchers(WebSecurityConfig.CATCH_ALL).permitAll()
            .and()
            .httpBasic();
        return http.build();
    }
    */
}
