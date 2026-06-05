package com.evaluation_1.mapper;

import com.evaluation_1.dto.JobSeekerReqDto;
import com.evaluation_1.model.JobSeeker;
import org.springframework.stereotype.Component;

@Component
public class JobSeekerMapper {

    public JobSeeker mapDtoToEntity(JobSeekerReqDto dto){
        JobSeeker jobSeeker = new JobSeeker();
        jobSeeker.setName(dto.name());
        jobSeeker.setResumeSummary(dto.resumeSummary());
        return jobSeeker;
    }
}
