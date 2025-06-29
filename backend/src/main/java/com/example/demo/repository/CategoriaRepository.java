package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Categoria;

public interface CategoriaRepository extends CrudRepository<Categoria, String> {
}
