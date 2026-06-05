package com.evaluation_1.mapper;

import com.evaluation_1.dto.CreateJobRequestDto;
import com.evaluation_1.dto.JobResponseDto;
import com.evaluation_1.model.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public Job mapToEntity(CreateJobRequestDto dto){
        Job job = new Job();
        job.setTitle(dto.title());
        job.setDescription(dto.description());
        job.setLocation(dto.location());
        job.setSalary(dto.salary());
        return job;
    }

    public JobResponseDto mapToDto(Job job){
        return new JobResponseDto(job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getSalary(),
                job.getEmployer().getCompanyName());
    }
}
