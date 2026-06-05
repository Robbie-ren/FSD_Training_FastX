package com.evaluation_1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateJobRequestDto(
        @NotBlank
        String title,
        @NotBlank
        String description,
        String location,
        @NotNull
        double salary
) {
}
