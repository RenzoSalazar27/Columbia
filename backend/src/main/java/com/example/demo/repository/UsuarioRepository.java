package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Métodos personalizados si son necesarios
    boolean existsByEmailUsuario(String emailUsuario);
    Optional<Usuario> findByEmailUsuario(String emailUsuario);
    
    // Métodos para clientes (no administradores)
    List<Usuario> findByEsAdminUsuarioFalse();
    Long countByEsAdminUsuarioFalse();
}