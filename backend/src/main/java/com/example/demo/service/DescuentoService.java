package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Descuento;
import com.example.demo.repository.DescuentoRepository;

@Service
public class DescuentoService {

    @Autowired
    private DescuentoRepository repository;

    public Iterable<Descuento> listar() {
        return repository.findAll();
    }

    public Optional<Descuento> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Descuento guardar(Descuento descuento) {
        return repository.save(descuento);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
