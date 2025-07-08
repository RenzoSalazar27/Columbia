package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.ItemCarrito;
import com.example.demo.service.ItemCarritoService;
import com.example.demo.repository.CarritoRepository;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.model.Usuario;
import com.example.demo.model.Carrito;
import java.time.LocalDate;

class ItemCarritoDTO {
    public Integer idCarrito;
    public Integer idProducto;
    public Integer cantidadItemCarrito;
}

@RestController
@RequestMapping("/api/items-carrito")
public class ItemCarritoController {

    @Autowired
    private ItemCarritoService service;
    @Autowired
    private CarritoRepository carritoRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public Iterable<ItemCarrito> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemCarrito> obtenerPorId(@PathVariable Integer id) {
        Optional<ItemCarrito> item = service.obtenerPorId(id);
        return item.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody ItemCarritoDTO dto) {
        var carritoOpt = carritoRepository.findById(dto.idCarrito);
        var productoOpt = productoRepository.findById(dto.idProducto);
        Carrito carrito;
        if (carritoOpt.isEmpty()) {
            // Buscar un usuario no admin para asociar el carrito
            var usuarios = usuarioRepository.findByEsAdminUsuarioFalse();
            if (usuarios.isEmpty()) {
                return ResponseEntity.badRequest().body("No hay usuarios disponibles para crear el carrito");
            }
            Usuario usuario = usuarios.get(0);
            carrito = new Carrito();
            carrito.setUsuario(usuario);
            carrito.setFechaCreacionCarrito(LocalDate.now());
            carrito = carritoRepository.save(carrito);
        } else {
            carrito = carritoOpt.get();
        }
        if (productoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Producto no encontrado");
        }
        ItemCarrito item = new ItemCarrito();
        item.setCarrito(carrito);
        item.setProducto(productoOpt.get());
        item.setCantidadItemCarrito(dto.cantidadItemCarrito);
        ItemCarrito guardado = service.guardar(item);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemCarrito> actualizar(@PathVariable Integer id, @RequestBody ItemCarrito item) {
        Optional<ItemCarrito> existente = service.obtenerPorId(id);
        if (existente.isPresent()) {
            item.setIdItemCarrito(id);
            return ResponseEntity.ok(service.guardar(item));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<ItemCarrito> item = service.obtenerPorId(id);
        if (item.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
