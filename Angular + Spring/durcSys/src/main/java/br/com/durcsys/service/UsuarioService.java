package br.com.durcsys.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.durcsys.exception.UsuarioException;
import br.com.durcsys.models.Usuario;
import br.com.durcsys.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public Usuario saveUser(Usuario usuario) {

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByEmail(String email) {

        return Optional.ofNullable(usuarioRepository.findByEmail(email)).orElseThrow(() -> new UsuarioException("Usuário não encontrado"));
    }

    public Usuario findById(Long id) {

        return Optional.of(usuarioRepository.findById(id)).orElseThrow(() -> new UsuarioException("Usuário não encontrado")).get();
    }

    public void deleteUser(Long id) {

        Usuario usuario = findById(id);

        usuarioRepository.delete(usuario);
    }

    public Usuario updateUser(Usuario usuario) {

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> findAll() {

        return null;
    }
}
