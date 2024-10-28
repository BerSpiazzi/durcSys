package br.com.durcsys.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Classe: LoginResponse.
 *
 * @uthor: Bernardo Spiazzi
 * @since: 1.0 27/10/2024
 */
@Getter
@Setter
@Builder

public class LoginResponseDto {

    private String token;

    private Long expiresIn;

}
