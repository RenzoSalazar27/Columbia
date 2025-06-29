package com.example.demo.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.DireccionEntrega;
import com.example.demo.service.DireccionEntregaService;
import com.example.demo.dto.DireccionEntregaDTO;
import com.example.demo.dto.UsuarioDireccionDTO;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/direcciones")
@CrossOrigin(origins = "*")
public class DireccionEntregaController {

    @Autowired
    private DireccionEntregaService direccionEntregaService;

    @GetMapping
    public ResponseEntity<?> listarTodasLasDirecciones() {
        try {
            List<DireccionEntregaDTO> direcciones = direccionEntregaService.listarTodasLasDirecciones();
            return ResponseEntity.ok(direcciones);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerDireccionPorId(@PathVariable String id) {
        try {
            DireccionEntregaDTO direccion = direccionEntregaService.obtenerDireccionPorId(id);
            return ResponseEntity.ok(direccion);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/consulta/jpql")
    public ResponseEntity<?> obtenerUsuariosConDireccionesJPQL() {
        try {
            List<UsuarioDireccionDTO> resultados = direccionEntregaService.obtenerUsuariosConDireccionesJPQL();
            return ResponseEntity.ok(resultados);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/consulta/sql")
    public ResponseEntity<?> obtenerUsuariosConDireccionesSQL() {
        try {
            List<UsuarioDireccionDTO> resultados = direccionEntregaService.obtenerUsuariosConDireccionesSQL();
            return ResponseEntity.ok(resultados);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/consulta/distrito/{distrito}")
    public ResponseEntity<?> obtenerUsuariosPorDistritoJPQL(@PathVariable String distrito) {
        try {
            List<UsuarioDireccionDTO> resultados = direccionEntregaService.obtenerUsuariosPorDistritoJPQL(distrito);
            return ResponseEntity.ok(resultados);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping
    public ResponseEntity<?> crearDireccionEntrega(@RequestBody DireccionEntregaDTO direccionDTO) {
        try {
            DireccionEntregaDTO direccionCreada = direccionEntregaService.crearDireccionEntrega(direccionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(direccionCreada);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarDireccionEntrega(@PathVariable String id, @RequestBody DireccionEntregaDTO direccionDTO) {
        try {
            DireccionEntregaDTO direccionActualizada = direccionEntregaService.actualizarDireccionEntrega(id, direccionDTO);
            return ResponseEntity.ok(direccionActualizada);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarDireccionEntrega(@PathVariable String id) {
        try {
            direccionEntregaService.eliminarDireccionEntrega(id);
            Map<String, String> mensaje = new HashMap<>();
            mensaje.put("mensaje", "Dirección de entrega eliminada exitosamente");
            return ResponseEntity.ok(mensaje);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> obtenerDireccionesPorUsuario(@PathVariable String idUsuario) {
        try {
            List<DireccionEntregaDTO> direcciones = direccionEntregaService.obtenerDireccionesPorUsuario(idUsuario);
            return ResponseEntity.ok(direcciones);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
