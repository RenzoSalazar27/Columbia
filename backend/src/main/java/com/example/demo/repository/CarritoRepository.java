package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Carrito;

public interface CarritoRepository extends CrudRepository<Carrito, Integer> {
}
