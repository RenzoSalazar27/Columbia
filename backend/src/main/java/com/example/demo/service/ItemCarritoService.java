package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.ItemCarrito;
import com.example.demo.repository.ItemCarritoRepository;

@Service
public class ItemCarritoService {

    @Autowired
    private ItemCarritoRepository repository;

    public Iterable<ItemCarrito> listar() {
        return repository.findAll();
    }

    public Optional<ItemCarrito> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public ItemCarrito guardar(ItemCarrito item) {
        return repository.save(item);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
