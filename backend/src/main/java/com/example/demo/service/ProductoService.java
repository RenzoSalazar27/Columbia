package com.example.demo.service;

import java.util.List;
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

    public Optional<Producto> obtenerPorId(Integer idProducto) {
        return repository.findById(idProducto);
    }

    public List<Producto> obtenerPorCategoria(Integer idCategoria) {
        return repository.findByCategoriaIdCategoria(idCategoria);
    }

    public Producto guardar(Producto producto) {
        return repository.save(producto);
    }

    public void eliminar(Integer idProducto) {
        repository.deleteById(idProducto);
    }
}
