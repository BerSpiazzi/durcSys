package br.com.durcsys.exception;

import java.io.Serial;

import org.springframework.http.HttpStatus;

import lombok.Getter;

/**
 * Classe: UsuarioException.
 *
 * @uthor: Bernardo Spiazzi
 * @since: 1.0 27/10/2024
 */
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
