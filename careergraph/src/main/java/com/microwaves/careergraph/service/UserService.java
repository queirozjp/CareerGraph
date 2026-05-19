package com.microwaves.careergraph.service;

import com.microwaves.careergraph.dto.ProfileDTO;
import com.microwaves.careergraph.entities.User;
import com.microwaves.careergraph.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileDTO getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        return new ProfileDTO(
                user.getName(),
                user.getEmail()
        );
    }

    @Transactional
    public void updateScores(String email, Map<String, Double> scores) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();
        user.setScores(scores);
        userRepository.save(user);
    }
}
