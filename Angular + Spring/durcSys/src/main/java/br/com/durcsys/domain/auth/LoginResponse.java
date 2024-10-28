package br.com.durcsys.domain.auth;

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

public class LoginResponse {

    private String token;

    private Long expiresIn;

}
