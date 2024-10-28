package br.com.durcsys.dto.auth;

public record RegisterUserDto(

        String email,

        String senha,

        String nome
) {

}