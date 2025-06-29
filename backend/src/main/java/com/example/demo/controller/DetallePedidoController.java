package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.DetallePedido;
import com.example.demo.service.DetallePedidoService;

@RestController
@RequestMapping("/api/detalle-pedidos")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoService service;

    @GetMapping
    public Iterable<DetallePedido> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetallePedido> obtenerPorId(@PathVariable String id) {
        Optional<DetallePedido> detalle = service.obtenerPorId(id);
        return detalle.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DetallePedido crear(@RequestBody DetallePedido detalle) {
        return service.guardar(detalle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetallePedido> actualizar(@PathVariable String id, @RequestBody DetallePedido detalle) {
        Optional<DetallePedido> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            detalle.setIdDetallePedido(id);
            return ResponseEntity.ok(service.guardar(detalle));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        Optional<DetallePedido> detalle = service.obtenerPorId(id);
        if (detalle.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
