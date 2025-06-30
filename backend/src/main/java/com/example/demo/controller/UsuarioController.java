package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Usuario;
import com.example.demo.service.UsuarioService;
import com.example.demo.dto.UsuarioDTO;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<?> listarTodosLosUsuarios() {
        try {
            List<UsuarioDTO> usuarios = usuarioService.listarTodosLosUsuarios();
            return ResponseEntity.ok(usuarios);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable String id) {
        try {
            UsuarioDTO usuario = usuarioService.obtenerUsuarioPorId(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String emailUsuario = loginData.get("emailUsuario");
            String contrasenaUsuario = loginData.get("contrasenaUsuario");
            
            if (emailUsuario == null || contrasenaUsuario == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email y contraseña son requeridos");
                return ResponseEntity.badRequest().body(error);
            }
            
            Map<String, Object> response = usuarioService.login(emailUsuario, contrasenaUsuario);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Map<String, String> registroData) {
        try {
            String nombreUsuario = registroData.get("nombreUsuario");
            String apellidoUsuario = registroData.get("apellidoUsuario");
            String emailUsuario = registroData.get("emailUsuario");
            String telefonoUsuario = registroData.get("telefonoUsuario");
            String fechaNacimientoUsuario = registroData.get("fechaNacimientoUsuario");
            String contrasenaUsuario = registroData.get("contrasenaUsuario");
            
            // Validar campos requeridos
            if (nombreUsuario == null || apellidoUsuario == null || emailUsuario == null || 
                telefonoUsuario == null || fechaNacimientoUsuario == null || contrasenaUsuario == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Todos los campos son requeridos");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Convertir fecha de nacimiento
            LocalDate fechaNacimiento = LocalDate.parse(fechaNacimientoUsuario);
            
            Map<String, Object> response = usuarioService.registro(
                nombreUsuario, apellidoUsuario, emailUsuario, telefonoUsuario, 
                fechaNacimiento, contrasenaUsuario
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error en el formato de fecha");
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/validar-contrasena")
    public ResponseEntity<?> validarContrasena(@RequestBody Map<String, String> validacionData) {
        try {
            String idUsuario = validacionData.get("idUsuario");
            String contrasenaActual = validacionData.get("contrasenaActual");
            
            if (idUsuario == null || contrasenaActual == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "ID de usuario y contraseña actual son requeridos");
                return ResponseEntity.badRequest().body(error);
            }
            
            Map<String, Object> response = usuarioService.validarContrasena(idUsuario, contrasenaActual);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            UsuarioDTO usuarioCreado = usuarioService.crearUsuario(usuarioDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioCreado);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable String id, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            UsuarioDTO usuarioActualizado = usuarioService.actualizarUsuario(id, usuarioDTO);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable String id) {
        try {
            usuarioService.eliminarUsuario(id);
            Map<String, String> mensaje = new HashMap<>();
            mensaje.put("mensaje", "Usuario eliminado exitosamente");
            return ResponseEntity.ok(mensaje);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
