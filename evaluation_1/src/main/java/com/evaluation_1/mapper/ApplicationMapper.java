package com.evaluation_1.mapper;

import com.evaluation_1.dto.ApplicationResponseDto;
import com.evaluation_1.model.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public ApplicationResponseDto mapToDto(Application application){
        return new ApplicationResponseDto(application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJob().getEmployer().getCompanyName());
    }
}
