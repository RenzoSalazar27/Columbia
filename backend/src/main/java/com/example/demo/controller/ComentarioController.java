package com.example.demo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Comentario;
import com.example.demo.service.ComentarioService;

@RestController
@RequestMapping("/api/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService service;

    @GetMapping
    public Iterable<Comentario> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comentario> obtenerPorId(@PathVariable String id) {
        Optional<Comentario> comentario = service.obtenerPorId(id);
        return comentario.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Comentario crear(@RequestBody Comentario comentario) {
        return service.guardar(comentario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comentario> actualizar(@PathVariable String id, @RequestBody Comentario comentario) {
        Optional<Comentario> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            comentario.setIdComentario(id);
            return ResponseEntity.ok(service.guardar(comentario));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        Optional<Comentario> comentario = service.obtenerPorId(id);
        if (comentario.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
