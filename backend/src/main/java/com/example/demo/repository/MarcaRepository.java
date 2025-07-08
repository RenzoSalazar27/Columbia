package com.example.demo.repository;

import com.example.demo.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
    // Métodos personalizados si son necesarios
    boolean existsByNombreMarca(String nombreMarca);
}
