package com.evaluation_1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JobSeekerReqDto(
        @NotNull
        @NotBlank
        String name,

        @NotBlank
        String resumeSummary,

        @NotNull
        @NotBlank
        String username,

        @NotNull
        @NotBlank
        String password
) {
}
