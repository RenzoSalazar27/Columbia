package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.ItemCarrito;
import com.example.demo.service.ItemCarritoService;

@RestController
@RequestMapping("/api/items-carrito")
public class ItemCarritoController {

    @Autowired
    private ItemCarritoService service;

    @GetMapping
    public Iterable<ItemCarrito> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCarrito> obtenerPorId(@PathVariable String id) {
        Optional<ItemCarrito> item = service.obtenerPorId(id);
        return item.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ItemCarrito crear(@RequestBody ItemCarrito item) {
        return service.guardar(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemCarrito> actualizar(@PathVariable String id, @RequestBody ItemCarrito item) {
        Optional<ItemCarrito> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            item.setIdItemCarrito(id);
            return ResponseEntity.ok(service.guardar(item));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        Optional<ItemCarrito> item = service.obtenerPorId(id);
        if (item.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
