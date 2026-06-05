package com.evaluation_1.service;

import com.evaluation_1.dto.EmployerReqDto;
import com.evaluation_1.enums.Role;
import com.evaluation_1.mapper.EmployerMapper;
import com.evaluation_1.mapper.UserMapper;
import com.evaluation_1.model.Employer;
import com.evaluation_1.model.User;
import com.evaluation_1.repository.EmployerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployerService {

    private final EmployerMapper employerMapper;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final EmployerRepository employerRepository;

    public void register(EmployerReqDto dto) {
        //get employer from mapper
        Employer employer = employerMapper.mapToEntity(dto);
        //get user from mapper
        User user = userMapper.mapEmployerDtoToEntity(dto);
        //get the encoded password and set in user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.EMPLOYER);
        //save user
        userService.save(user);
        //set user in employer
        employer.setUser(user);
        //save employer
        employerRepository.save(employer);
    }


    public Employer getByUsername(String username) {
        return employerRepository.findByUserUsername(username);
    }
}
