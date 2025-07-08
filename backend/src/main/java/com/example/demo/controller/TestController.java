package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class TestController {

    @GetMapping
    public Map<String, Object> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Backend funcionando correctamente");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        response.put("status", "OK");
        return response;
    }

    @GetMapping("/categorias")
    public Map<String, Object> testCategorias() {
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Endpoint de categorías disponible");
        response.put("url", "/api/categorias");
        return response;
    }

    @GetMapping("/usuarios")
    public Map<String, Object> testUsuarios() {
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Endpoint de usuarios disponible");
        response.put("url", "/api/usuarios");
        response.put("endpoints", new String[]{
            "GET /api/usuarios - Listar usuarios",
            "POST /api/usuarios/login - Login",
            "POST /api/usuarios/registro - Registro",
            "POST /api/usuarios/restablecer-contrasena - Restablecer contraseña"
        });
        return response;
    }
} 