package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Categoria;
import com.example.demo.repository.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository repository;

    public Iterable<Categoria> listar() {
        return repository.findAll();
    }

    public Optional<Categoria> obtenerPorId(Integer id) {
        return repository.findById(id);
    }

    public Categoria guardar(Categoria categoria) {
        return repository.save(categoria);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
