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

    public Optional<ItemCarrito> obtenerPorId(Integer id) {
        return repository.findById(id);
    }

    public Optional<ItemCarrito> obtenerPorCarritoYProducto(Integer idCarrito, Integer idProducto) {
        return repository.findByCarrito_IdCarritoAndProducto_IdProducto(idCarrito, idProducto);
    }

    public ItemCarrito guardar(ItemCarrito item) {
        return repository.save(item);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }

    public void vaciarPorCarrito(Integer idCarrito) {
        repository.deleteByCarrito_IdCarrito(idCarrito);
    }
}
