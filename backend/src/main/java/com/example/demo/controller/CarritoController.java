package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Carrito;
import com.example.demo.service.CarritoService;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {

    @Autowired
    private CarritoService service;

    @GetMapping
    public Iterable<Carrito> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtenerPorId(@PathVariable Integer id) {
        Optional<Carrito> carrito = service.obtenerPorId(id);
        return carrito.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Carrito> obtenerPorUsuarioId(@PathVariable Integer idUsuario) {
        Optional<Carrito> carrito = service.obtenerPorUsuarioId(idUsuario);
        return carrito.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Carrito crear(@RequestBody Carrito carrito) {
        Optional<Carrito> existente = service.obtenerPorUsuarioId(carrito.getUsuario().getIdUsuario());
        if (existente.isPresent()) {
            return existente.get();
        }
        return service.guardar(carrito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carrito> actualizar(@PathVariable Integer id, @RequestBody Carrito carrito) {
        Optional<Carrito> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            carrito.setIdCarrito(id);
            return ResponseEntity.ok(service.guardar(carrito));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Carrito> carrito = service.obtenerPorId(id);
        if (carrito.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
