package com.evaluation_1.controller;

import com.evaluation_1.dto.ApplicationResponseDto;
import com.evaluation_1.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply/{jobId}")
    public void apply(@PathVariable int jobId, Principal principal){
        String username = principal.getName();
        applicationService.apply(jobId, username);
    }

    @GetMapping("/my-applications")
    public List<ApplicationResponseDto> getMyApplications(Principal principal,
                                                          @RequestParam(defaultValue = "0", required = false)int page,
                                                          @RequestParam(defaultValue = "10", required = false)int size){
        String username = principal.getName();
        return applicationService.getMyApplications(username, page, size);
    }
}
