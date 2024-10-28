package br.com.durcsys.infra;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import br.com.durcsys.exception.AbstractControllerExceptionHandler;
import br.com.durcsys.exception.UsuarioException;

@ControllerAdvice
public class DurcSysControllerExceptionHandler extends AbstractControllerExceptionHandler {

    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ResponseEntity<?> securityException(RuntimeException ex, WebRequest request) {

        return createResponse(request, ex.getMessage(), HttpStatus.FORBIDDEN, null);
    }

    @ExceptionHandler({UsuarioException.class})
    public ResponseEntity<?> usuarioException(RuntimeException ex, WebRequest request) {

        return createResponse(request, ex.getMessage(), HttpStatus.BAD_REQUEST, null);
    }

}
