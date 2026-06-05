package com.evaluation_1.repository;

import com.evaluation_1.model.JobSeeker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, Integer> {
    JobSeeker findByUserUsername(String username);
}
