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

    public Optional<Carrito> obtenerPorId(Integer id) {
        return repository.findById(id);
    }

    public Optional<Carrito> obtenerPorUsuarioId(Integer idUsuario) {
        return repository.findByUsuario_IdUsuario(idUsuario);
    }

    public Carrito guardar(Carrito carrito) {
        return repository.save(carrito);
    }

    public void eliminar(Integer id) {
        repository.deleteById(id);
    }
}
