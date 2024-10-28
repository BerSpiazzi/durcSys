package br.com.durcsys.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.durcsys.dto.auth.LoginResponseDto;
import br.com.durcsys.dto.auth.LoginUserDto;
import br.com.durcsys.dto.auth.RegisterUserDto;
import br.com.durcsys.models.Usuario;
import br.com.durcsys.service.security.AuthenticationService;
import br.com.durcsys.service.security.JwtService;

import io.swagger.v3.oas.annotations.Operation;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {

        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @Operation(summary = "Registrar usuário",
            description = "Cria um novo usuário no sistema através da tela inicial de cadastro")
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {

        Usuario registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @Operation(summary = "Autenticar usuário",
            description = "Autentica um usuário no sistema através da tela inicial de login")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticate(@RequestBody LoginUserDto loginUserDto) {

        Usuario authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .token(jwtToken)
                .expiresIn(jwtService.getExpirationTime())
                .build();

        return ResponseEntity.ok(loginResponseDto);
    }
}