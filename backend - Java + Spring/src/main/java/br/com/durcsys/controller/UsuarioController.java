package br.com.durcsys.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.durcsys.models.Usuario;
import br.com.durcsys.service.UsuarioService;

import lombok.RequiredArgsConstructor;

import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(summary = "Novo usuário",
            description = "Cria um novo usuário no sistema")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioService.saveUser(usuario));
    }

    @Operation(summary = "Lista de usuários",
            description = "Retorna todos os usuários cadastrados no sistema")
    @GetMapping
    public ResponseEntity<?> findAll() {

        return ResponseEntity.ok(usuarioService.findAll());
    }

    @Operation(summary = "Busca usuário por Email",
            description = "Retorna um usuário específico pelo EMAIL informado")
    @GetMapping("/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) {

        return ResponseEntity.ok(usuarioService.findByEmail(email));
    }

    @Operation(summary = "Atualizar usuário",
            description = "Atualiza um usuário existente no sistema")
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioService.updateUser(usuario));
    }

    @Operation(summary = "Deletar usuário",
            description = "Deleta um usuário existente no sistema")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        usuarioService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
