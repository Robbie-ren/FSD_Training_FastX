package com.evaluation_1.service;

import com.evaluation_1.enums.Role;
import com.evaluation_1.mapper.JobSeekerMapper;
import com.evaluation_1.dto.JobSeekerReqDto;
import com.evaluation_1.mapper.UserMapper;
import com.evaluation_1.model.JobSeeker;
import com.evaluation_1.model.User;
import com.evaluation_1.repository.JobSeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobSeekerService {
    private final JobSeekerMapper jobSeekerMapper;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JobSeekerRepository jobSeekerRepository;
    private final UserService userService;


    public void register(JobSeekerReqDto dto) {
        //get jobSeeker from mapper
        JobSeeker jobSeeker = jobSeekerMapper.mapDtoToEntity(dto);
        //get user from mapper
        User user = userMapper.mapJobSeekerDtoToEntity(dto);
        //encode password and set in user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.JOB_SEEKER);
        //save user
        userService.save(user);
        //set user in jobSeeker
        jobSeeker.setUser(user);
        //save job seeker
        jobSeekerRepository.save(jobSeeker);
    }

    public JobSeeker getByUsername(String username) {
        return jobSeekerRepository.findByUserUsername(username);
    }
}
