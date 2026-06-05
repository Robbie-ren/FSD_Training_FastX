package com.evaluation_1.dto;

public record JobResponseDto(
        int id,
        String title,
        String location,
        double salary,
        String companyName
) {
}
