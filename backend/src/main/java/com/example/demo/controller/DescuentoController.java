package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Descuento;
import com.example.demo.service.DescuentoService;

@RestController
@RequestMapping("/api/descuentos")
public class DescuentoController {

    @Autowired
    private DescuentoService service;

    @GetMapping
    public Iterable<Descuento> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Descuento> obtenerPorId(@PathVariable String id) {
        Optional<Descuento> descuento = service.obtenerPorId(id);
        return descuento.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Descuento crear(@RequestBody Descuento descuento) {
        return service.guardar(descuento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Descuento> actualizar(@PathVariable String id, @RequestBody Descuento descuento) {
        Optional<Descuento> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            descuento.setIdDescuento(id);
            return ResponseEntity.ok(service.guardar(descuento));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        Optional<Descuento> descuento = service.obtenerPorId(id);
        if (descuento.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
