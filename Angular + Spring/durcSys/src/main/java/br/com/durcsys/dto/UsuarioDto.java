package br.com.durcsys.dto;

import java.util.List;

import br.com.durcsys.models.Usuario;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Classe: UsuarioDto.
 *
 * @uthor: Bernardo Spiazzi
 * @since: 1.0 28/10/2024
 */
@Getter
@Setter
@Builder
public class UsuarioDto {

    private Long id;

    private String nome;

    private String email;

    public static List<UsuarioDto> from(List<Usuario> usuarios) {

        return usuarios.stream().map(UsuarioDto::from).toList();
    }

    public static UsuarioDto from(Usuario usuario) {

        return UsuarioDto.builder()
                .id(usuario.getId())
                .nome(usuario.getNome())
                .email(usuario.getEmail())
                .build();
    }

}