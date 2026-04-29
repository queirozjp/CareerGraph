package com.microwaves.careergraph.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record RegisterRequest(
        @NotBlank
        @Size(min = 3, max = 20)
        String name,
        @Email
        @NotBlank
        String email,
        @NotBlank
        @Size(min = 8, message = "The password must have at least 8 characters")
        String password,
        Map<String, Double> scores
) {}
