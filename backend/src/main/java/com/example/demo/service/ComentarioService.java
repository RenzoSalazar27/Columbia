package com.example.demo.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Comentario;
import com.example.demo.repository.ComentarioRepository;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository repository;

    public Iterable<Comentario> listar() {
        return repository.findAll();
    }

    public Optional<Comentario> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Comentario guardar(Comentario comentario) {
        return repository.save(comentario);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
