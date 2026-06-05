package com.evaluation_1.controller;

import com.evaluation_1.dto.EmployerReqDto;
import com.evaluation_1.dto.JobSeekerReqDto;
import com.evaluation_1.dto.TokenDto;
import com.evaluation_1.service.EmployerService;
import com.evaluation_1.service.JobSeekerService;
import com.evaluation_1.util.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final JwtUtility jwtUtility;
    private final EmployerService employerService;
    private final JobSeekerService jobSeekerService;

    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username, token);
    }

    @PostMapping("/register/employer")
    public void registerEmployer(@Valid @RequestBody EmployerReqDto dto){
        employerService.register(dto);
    }

    @PostMapping("/register/jobSeeker")
    public void registerSeeker(@Valid @RequestBody JobSeekerReqDto dto){
        jobSeekerService.register(dto);
    }
}

