package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.ItemCarrito;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface ItemCarritoRepository extends CrudRepository<ItemCarrito, Integer> {
    Optional<ItemCarrito> findByCarrito_IdCarritoAndProducto_IdProducto(Integer idCarrito, Integer idProducto);

    @Transactional
    @Modifying
    void deleteByCarrito_IdCarrito(Integer idCarrito);
}
