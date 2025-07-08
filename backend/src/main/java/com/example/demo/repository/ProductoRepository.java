package com.example.demo.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Integer> {
    List<Producto> findByCategoriaIdCategoria(Integer idCategoria);
}
