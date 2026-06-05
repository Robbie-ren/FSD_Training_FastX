package com.evaluation_1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployerReqDto(

        @NotNull
        @NotBlank
        String companyName,

        @NotNull
        @NotBlank
        String username,

        @NotNull
        @NotBlank
        String password
) {
}
