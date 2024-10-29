package br.com.durcsys.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.durcsys.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("""
            UPDATE Usuario u 
            SET u.nome = :nome, 
            u.email = :email
            WHERE u.id = :id
            """)
    void update(Long id, String nome, String email);
}