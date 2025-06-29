package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.Comentario;

public interface ComentarioRepository extends CrudRepository<Comentario, String> {
}
