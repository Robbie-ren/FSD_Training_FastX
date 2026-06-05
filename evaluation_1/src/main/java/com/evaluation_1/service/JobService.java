package com.evaluation_1.service;

import com.evaluation_1.ResourceNotFoundException;
import com.evaluation_1.dto.CreateJobRequestDto;
import com.evaluation_1.dto.JobResponseDto;
import com.evaluation_1.mapper.JobMapper;
import com.evaluation_1.model.Employer;
import com.evaluation_1.model.Job;
import com.evaluation_1.repository.JobRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {
    private final EmployerService employerService;
    private final JobMapper jobMapper;
    private final JobRepository jobRepository;

    public void createJob(@Valid CreateJobRequestDto dto, String username) {
        //get employer by username
        Employer employer = employerService.getByUsername(username);
        Job job = jobMapper.mapToEntity(dto);
        //add employer to job
        job.setEmployer(employer);
        jobRepository.save(job);
    }

    public List<JobResponseDto> getAllJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        List<Job> list = jobRepository.findAll(pageable).getContent();

        return list.stream().map(jobMapper::mapToDto).toList();
    }

    public Job getById(int jobId) {
        return jobRepository.findById(jobId).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }
}



