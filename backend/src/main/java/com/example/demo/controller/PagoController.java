package com.example.demo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Pago;
import com.example.demo.service.PagoService;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService service;

    @GetMapping
    public Iterable<Pago> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtenerPorId(@PathVariable Integer id) {
        Optional<Pago> pago = service.obtenerPorId(id);
        return pago.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pago crear(@RequestBody Pago pago) {
        return service.guardar(pago);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pago> actualizar(@PathVariable Integer id, @RequestBody Pago pago) {
        Optional<Pago> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            pago.setIdPago(id);
            return ResponseEntity.ok(service.guardar(pago));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Pago> pago = service.obtenerPorId(id);
        if (pago.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
