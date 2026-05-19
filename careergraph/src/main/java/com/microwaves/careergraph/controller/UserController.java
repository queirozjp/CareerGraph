package com.microwaves.careergraph.controller;

import com.microwaves.careergraph.dto.ProfileDTO;
import com.microwaves.careergraph.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/profile")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ProfileDTO> getProfile(Authentication authentication) {
        String email = authentication.getName();
        ProfileDTO profile = userService.getProfile(email);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/scores")
    public ResponseEntity<Void> updateScores(Authentication authentication, @RequestBody Map<String, Double> scores) {
        String email = authentication.getName();
        userService.updateScores(email, scores);
        return ResponseEntity.ok().build();
    }
}
