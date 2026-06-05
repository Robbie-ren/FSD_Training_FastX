package com.evaluation_1.service;

import com.evaluation_1.dto.ApplicationResponseDto;
import com.evaluation_1.mapper.ApplicationMapper;
import com.evaluation_1.model.Application;
import com.evaluation_1.model.Job;
import com.evaluation_1.model.JobSeeker;
import com.evaluation_1.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final JobService jobService;
    private final JobSeekerService jobSeekerService;
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    public void apply(int jobId, String username) {
        Application application = new Application();
        JobSeeker jobSeeker = jobSeekerService.getByUsername(username);
        Job job = jobService.getById(jobId);
        application.setJobSeeker(jobSeeker);
        application.setJob(job);
        applicationRepository.save(application);

    }

    public List<ApplicationResponseDto> getMyApplications(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        List<Application> list = applicationRepository.findByJobSeekerUserUsername(username, pageable).getContent();

        return list.stream().map(applicationMapper::mapToDto).toList();
    }
}


