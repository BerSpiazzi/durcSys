package br.com.durcsys.exception;

import java.io.Serial;

import org.springframework.http.HttpStatusCode;

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

    private final HttpStatusCode status;

    public UsuarioException(String message, HttpStatusCode status) {

        this.message = message;
        this.status = status;
    }

}
