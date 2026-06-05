package com.evaluation_1.controller;

import com.evaluation_1.dto.CreateJobRequestDto;
import com.evaluation_1.dto.JobResponseDto;
import com.evaluation_1.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@AllArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/createJob")
    public void createJob(@Valid @RequestBody CreateJobRequestDto dto, Principal principal){
            String username = principal.getName();
            jobService.createJob(dto, username);
    }

    @GetMapping("/api/allJobs")
    public List<JobResponseDto> GetAllJobs(@RequestParam(defaultValue = "0", required = false)int page,
                                           @RequestParam(defaultValue = "10", required = false)int size){
        return jobService.getAllJobs(page, size);
    }
}
