package br.com.durcsys.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.durcsys.dto.UsuarioDto;
import br.com.durcsys.exception.UsuarioException;
import br.com.durcsys.models.Usuario;
import br.com.durcsys.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioDto saveUser(Usuario usuario) {

        Usuario user = usuarioRepository.findByEmail(usuario.getEmail()).orElse(null);

        if (user != null) {
            throw new UsuarioException("Usuário já cadastrado", HttpStatus.BAD_REQUEST);
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        Usuario newUsuario = usuarioRepository.save(usuario);

        return UsuarioDto.from(newUsuario);
    }

    public Usuario findById(Long id) {

        return Optional.of(usuarioRepository.findById(id)).orElseThrow(() -> new UsuarioException("Usuário não encontrado", HttpStatus.BAD_REQUEST)).get();
    }

    public void deleteUser(Long id) {

        Usuario usuario = findById(id);

        usuarioRepository.delete(usuario);
    }

    public UsuarioDto updateUser(Usuario usuario) {

        usuarioRepository.update(usuario.getId(), usuario.getNome(), usuario.getEmail());

        return UsuarioDto.from(usuario);
    }

    public List<UsuarioDto> findAll(Long idUsuario) {

        List<Usuario> usuarios = Optional.of(usuarioRepository.findAll())
                .orElseThrow(() -> new UsuarioException("Nenhum usuário encontrado", HttpStatus.BAD_REQUEST));

        usuarios.removeIf(u -> u.getId().equals(idUsuario));

        return UsuarioDto.from(usuarios);
    }
}
