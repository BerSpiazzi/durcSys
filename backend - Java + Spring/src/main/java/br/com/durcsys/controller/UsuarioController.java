package br.com.durcsys.controller;

import org.springframework.http.ResponseEntity;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(summary = "Novo usuário",
            description = "Cria um novo usuário no sistema")
    @PostMapping("")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {

        return ResponseEntity.ok(usuarioService.saveUser(usuario));
    }

    @Operation(summary = "Lista de usuários",
            description = "Retorna todos os usuários cadastrados no sistema")
    @GetMapping("/{idUsuario}")
    public ResponseEntity<?> findAll(@PathVariable("idUsuario") Long idUsuario) {

        return ResponseEntity.ok(usuarioService.findAll(idUsuario));
    }

    @Operation(summary = "Atualizar usuário",
            description = "Atualiza um usuário existente no sistema")
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody Usuario usuario) {

        usuarioService.updateUser(usuario);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Deletar usuário",
            description = "Deleta um usuário existente no sistema")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        usuarioService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
