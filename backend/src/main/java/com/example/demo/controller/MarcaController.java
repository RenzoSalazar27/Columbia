package com.example.demo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Marca;
import com.example.demo.service.MarcaService;

@RestController
@RequestMapping("/api/marcas")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class MarcaController {

    @Autowired
    private MarcaService service;

    @GetMapping
    public Iterable<Marca> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marca> obtenerPorId(@PathVariable Integer id) {
        Optional<Marca> marca = service.obtenerPorId(id);
        return marca.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Marca crear(@RequestBody Marca marca) {
        return service.guardar(marca);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marca> actualizar(@PathVariable Integer id, @RequestBody Marca marca) {
        Optional<Marca> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            marca.setIdMarca(id);
            return ResponseEntity.ok(service.guardar(marca));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Marca> marca = service.obtenerPorId(id);
        if (marca.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
