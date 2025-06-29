package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.DetallePedido;
import com.example.demo.repository.DetallePedidoRepository;

@Service
public class DetallePedidoService {

    @Autowired
    private DetallePedidoRepository repository;

    public Iterable<DetallePedido> listar() {
        return repository.findAll();
    }

    public Optional<DetallePedido> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public DetallePedido guardar(DetallePedido detalle) {
        return repository.save(detalle);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
