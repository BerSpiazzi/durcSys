package br.com.durcsys.service.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.durcsys.domain.auth.LoginUserDto;
import br.com.durcsys.domain.auth.RegisterUserDto;
import br.com.durcsys.models.Usuario;
import br.com.durcsys.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public Usuario signup(RegisterUserDto input) {

        Usuario user = Usuario.builder()
                .email(input.email())
                .senha(passwordEncoder.encode(input.senha()))
                .nome(input.nome())
                .build();

        return userRepository.save(user);
    }

    public Usuario authenticate(LoginUserDto input) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.email(),
                        input.password()
                )
        );

        return userRepository.findByEmail(input.email())
                .orElseThrow();
    }
}