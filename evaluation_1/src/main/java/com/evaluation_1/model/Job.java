package com.evaluation_1.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    @Column(length = 500)
    private String description;

    private String location;

    private double salary;

    @ManyToOne
    private Employer employer;
}
