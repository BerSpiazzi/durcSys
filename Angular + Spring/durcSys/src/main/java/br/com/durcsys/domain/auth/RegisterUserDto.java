package br.com.durcsys.domain.auth;

public record RegisterUserDto(

        String email,

        String senha,

        String nome
) {

}