package com.evaluation_1.repository;

import com.evaluation_1.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer, Integer> {

    Employer findByUserUsername(String username);
}
