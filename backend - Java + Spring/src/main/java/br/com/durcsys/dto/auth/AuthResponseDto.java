package br.com.durcsys.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder

public class AuthResponseDto {

    private Long idUsuario;

    private String nome;

    private String token;

    private Long expiresIn;

}
