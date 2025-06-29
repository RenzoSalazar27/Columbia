package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Descuento;

public interface DescuentoRepository extends CrudRepository<Descuento, String> {
}
