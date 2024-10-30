package br.com.durcsys.dto.auth;

import br.com.durcsys.validator.EmailValidator;

public record RegisterUserDto(

        @EmailValidator
        String email,

        String senha,

        String nome
) {

}