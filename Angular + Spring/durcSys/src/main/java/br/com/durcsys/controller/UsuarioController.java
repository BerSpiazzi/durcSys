package br.com.durcsys.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.durcsys.models.Usuario;
import br.com.durcsys.service.UsuarioService;
import br.com.durcsys.service.security.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {

        Usuario novoUsuario = usuarioService.saveUser(usuario);
        return ResponseEntity.ok(novoUsuario);
    }

    @GetMapping
    public ResponseEntity<?> findAll() {

        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) {

        return ResponseEntity.ok(usuarioService.findByEmail(email));
    }

    @PostMapping
    public ResponseEntity<?> updateUser(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioService.updateUser(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        usuarioService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
