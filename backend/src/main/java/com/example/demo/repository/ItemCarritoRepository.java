package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.ItemCarrito;
import java.util.Optional;

public interface ItemCarritoRepository extends CrudRepository<ItemCarrito, Integer> {
    Optional<ItemCarrito> findByCarrito_IdCarritoAndProducto_IdProducto(Integer idCarrito, Integer idProducto);
}
