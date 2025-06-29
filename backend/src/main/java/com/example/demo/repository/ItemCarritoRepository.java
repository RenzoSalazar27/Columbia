package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.ItemCarrito;

public interface ItemCarritoRepository extends CrudRepository<ItemCarrito, String> {
}
