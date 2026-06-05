package com.evaluation_1.mapper;

import com.evaluation_1.dto.EmployerReqDto;
import com.evaluation_1.dto.JobSeekerReqDto;
import com.evaluation_1.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User mapJobSeekerDtoToEntity(JobSeekerReqDto dto){
        User user = new User();
        user.setUsername(dto.username());
        user.setPassword(dto.password());
        return user;
    }

    public User mapEmployerDtoToEntity(EmployerReqDto dto){
        User user = new User();
        user.setUsername(dto.username());
        user.setPassword(dto.password());
        return user;
    }
}
