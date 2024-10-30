package br.com.durcsys.exception;

import java.io.Serial;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class UsuarioException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    private final String message;

    private final HttpStatus status;

    public UsuarioException(String message, HttpStatus status) {

        this.message = message;
        this.status = status;
    }

}
