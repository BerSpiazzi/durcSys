package br.com.durcsys.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import br.com.durcsys.domain.error.ErrorField;
import br.com.durcsys.domain.error.ErrorMessage;

@ControllerAdvice
@Order(-1)
public class AbstractControllerExceptionHandler {

    protected ResponseEntity<?> createResponse(WebRequest request, String dsMessage, HttpStatus httpStatus) {

        return createResponse(request, dsMessage, httpStatus, null);
    }

    protected ResponseEntity<?> createResponse(WebRequest request, String dsMessage, HttpStatus httpStatus, List<ErrorField> errorFields) {

        ErrorMessage message = new ErrorMessage(
                httpStatus.value(),
                LocalDateTime.now(),
                dsMessage,
                request.getDescription(false),
                errorFields);

        return new ResponseEntity<>(message, httpStatus);
    }
}