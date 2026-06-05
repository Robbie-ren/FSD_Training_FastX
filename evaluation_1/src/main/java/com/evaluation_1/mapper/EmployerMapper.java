package com.evaluation_1.mapper;

import com.evaluation_1.dto.EmployerReqDto;
import com.evaluation_1.model.Employer;
import org.springframework.stereotype.Component;

@Component
public class EmployerMapper {

    public Employer mapToEntity(EmployerReqDto dto){
        Employer employer = new Employer();
        employer.setCompanyName(dto.companyName());
        return employer;
    }
}
