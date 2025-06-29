package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Marca;

public interface MarcaRepository extends CrudRepository<Marca, String> {
}
