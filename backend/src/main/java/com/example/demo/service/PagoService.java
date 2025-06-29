package com.example.demo.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Pago;
import com.example.demo.repository.PagoRepository;

@Service
public class PagoService {

    @Autowired
    private PagoRepository repository;

    public Iterable<Pago> listar() {
        return repository.findAll();
    }

    public Optional<Pago> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Pago guardar(Pago pago) {
        return repository.save(pago);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}
