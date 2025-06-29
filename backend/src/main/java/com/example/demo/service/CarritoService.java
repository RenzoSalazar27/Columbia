package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Carrito;
import com.example.demo.repository.CarritoRepository;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository repository;

    public Iterable<Carrito> listar() {
        return repository.findAll();
    }

    public Optional<Carrito> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Carrito guardar(Carrito carrito) {
        return repository.save(carrito);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
