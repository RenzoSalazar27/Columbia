package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repository;

    public Iterable<Producto> listar() {
        return repository.findAll();
    }

    public Optional<Producto> obtenerPorId(String idProducto) {
        return repository.findById(idProducto);
    }

    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    public void eliminar(String idProducto) {
        repository.deleteById(idProducto);
    }
}
