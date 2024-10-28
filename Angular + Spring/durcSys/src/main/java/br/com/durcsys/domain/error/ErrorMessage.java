package br.com.durcsys.domain.error;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorMessage {

    private int status;

    private LocalDateTime timestamp;

    private String message;

    private String description;

    private List<ErrorField> errorFields;
}
