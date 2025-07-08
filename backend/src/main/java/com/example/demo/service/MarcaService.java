package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Marca;
import com.example.demo.repository.MarcaRepository;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository repository;

    public Iterable<Marca> listar() {
        return repository.findAll();
    }

    public Optional<Marca> obtenerPorId(Integer id) {
        return repository.findById(id);
    }

    public Marca guardar(Marca marca) {
        return repository.save(marca);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
