package br.com.durcsys.dto.auth;

/**
 * Classe: LoginUserDto.
 *
 * @uthor: Bernardo Spiazzi
 * @since: 1.0 27/10/2024
 */
public record LoginUserDto(
        String email,
        String senha
) {

}