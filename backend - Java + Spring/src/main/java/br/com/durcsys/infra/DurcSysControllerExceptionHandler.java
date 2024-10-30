package br.com.durcsys.infra;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import br.com.durcsys.dto.error.ErrorField;
import br.com.durcsys.dto.error.ErrorMessage;
import br.com.durcsys.exception.AbstractControllerExceptionHandler;
import br.com.durcsys.exception.UsuarioException;

import jakarta.servlet.http.HttpServletRequest;

import io.jsonwebtoken.MalformedJwtException;

@ControllerAdvice
public class DurcSysControllerExceptionHandler extends AbstractControllerExceptionHandler {

    @Autowired
    private HttpServletRequest request;

    @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
    public ResponseEntity<?> securityException(RuntimeException ex, WebRequest request) {

        return createResponse(request, "Credenciais inválidas", HttpStatus.FORBIDDEN, null);
    }

    @ExceptionHandler({UsuarioException.class})
    public ResponseEntity<?> usuarioException(UsuarioException ex, WebRequest request) {

        return createResponse(request, ex.getMessage(), ex.getStatus(), null);
    }

    @ExceptionHandler({MalformedJwtException.class})
    public ResponseEntity<?> malformedJwtException(MalformedJwtException ex, WebRequest request) {

        return createResponse(request, ex.getMessage(), HttpStatus.UNAUTHORIZED, null);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<?> methodArgumentNotValidException(MethodArgumentNotValidException ex) {

        String requestPath = request.getRequestURI();
        FieldError fieldErrors = ex.getBindingResult().getFieldError();

        assert fieldErrors != null;
        String errorMessage = fieldErrors.getDefaultMessage();

        ErrorMessage message = new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                errorMessage,
                requestPath,
                List.of(new ErrorField(fieldErrors.getField(), errorMessage)));

        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}