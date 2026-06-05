package com.evaluation_1.config;
import com.evaluation_1.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final UserService userService;


    @Bean
    public SecurityFilterChain approvalsSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/api/auth/login").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/auth/register/jobSeeker").permitAll()
                        .requestMatchers(HttpMethod.POST, "api/auth/register/jobSeeker").permitAll()
                        .requestMatchers(HttpMethod.POST, "api/jobs/createJob").hasAuthority("EMPLOYER")
                        .requestMatchers(HttpMethod.GET, "/api/jobs/api/allJobs").hasAnyAuthority("JOB_SEEKER", "EMPLOYER")
                        .requestMatchers(HttpMethod.POST, "/api/applications/apply/{jobId}").hasAuthority("JOB_SEEKER")
                        .requestMatchers(HttpMethod.GET, "/api/applications/my-applications").hasAuthority("JOB_SEEKER")
                        .anyRequest().authenticated()
                )

                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}