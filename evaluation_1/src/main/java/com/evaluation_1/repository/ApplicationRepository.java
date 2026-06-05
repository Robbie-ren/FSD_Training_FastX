package com.evaluation_1.repository;


import com.evaluation_1.model.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    Page<Application> findByJobSeekerUserUsername(String username, Pageable pageable);
}
