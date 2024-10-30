package br.com.durcsys.dto.auth;

import br.com.durcsys.validator.EmailValidator;

public record LoginUserDto(
        @EmailValidator
        String email,
        String senha
) {

}
