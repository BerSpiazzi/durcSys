package br.com.durcsys.dto.error;

import java.io.Serial;
import java.io.Serializable;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ErrorResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = -1604915078557985449L;

    private String messagem;
}
