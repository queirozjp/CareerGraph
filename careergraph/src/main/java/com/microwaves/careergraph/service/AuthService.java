package com.microwaves.careergraph.service;

import com.microwaves.careergraph.dto.AuthResponse;
import com.microwaves.careergraph.dto.LoginRequest;
import com.microwaves.careergraph.dto.RegisterRequest;
import com.microwaves.careergraph.exception.EmailAlreadyExistsException;
import com.microwaves.careergraph.exception.InvalidAuthException;
import com.microwaves.careergraph.exception.InvalidPasswordException;
import com.microwaves.careergraph.models.User;
import com.microwaves.careergraph.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())){
            throw new EmailAlreadyExistsException("Email já está em uso!");
        }
        User newUser = new User();
        newUser.setName(request.name());
        newUser.setEmail(request.email());
        newUser.setPassword(encoder.encode(request.password()));
        newUser.setScores(request.scores());
        userRepository.save(newUser);
        return new AuthResponse(
                "Cadastro realizado com sucesso!",
                jwtService.generateToken(newUser.getEmail())
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new InvalidAuthException("Email ou senha inválidos!"));

        if (!encoder.matches(request.password(), user.getPassword())) {
            throw new InvalidPasswordException("Senha invalida!");
        }
        return new AuthResponse(
                "Entrando...",
                jwtService.generateToken(user.getEmail())
        );
    }
}
