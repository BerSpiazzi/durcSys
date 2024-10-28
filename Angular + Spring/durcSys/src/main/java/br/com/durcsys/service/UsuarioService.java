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

    public Usuario findByEmail(String email) {

        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if (usuario.isEmpty()) {
            throw new UsuarioException("Usuário não encontrado", HttpStatus.BAD_REQUEST);
        }

        return usuario.get();
    }

    public Usuario findById(Long id) {

        return Optional.of(usuarioRepository.findById(id)).orElseThrow(() -> new UsuarioException("Usuário não encontrado", HttpStatus.BAD_REQUEST)).get();
    }

    public void deleteUser(Long id) {

        Usuario usuario = findById(id);

        usuarioRepository.delete(usuario);
    }

    public Usuario updateUser(Usuario usuario) {

        Usuario existingUsuario = findById(usuario.getId());
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.update(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getSenha());
        return usuario;
    }

    public List<UsuarioDto> findAll() {

        List<Usuario> usuarios = Optional.of(usuarioRepository.findAll())
                .orElseThrow(() -> new UsuarioException("Nenhum usuário encontrado", HttpStatus.BAD_REQUEST));

        return UsuarioDto.from(usuarios);
    }
}
