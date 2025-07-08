package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Carrito;
import java.util.Optional;

public interface CarritoRepository extends CrudRepository<Carrito, Integer> {
    Optional<Carrito> findByUsuario_IdUsuario(Integer idUsuario);
}
