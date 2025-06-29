package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Pedido;
import com.example.demo.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository repository;

    public Iterable<Pedido> listar() {
        return repository.findAll();
    }

    public Optional<Pedido> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Pedido guardar(Pedido pedido) {
        return repository.save(pedido);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
