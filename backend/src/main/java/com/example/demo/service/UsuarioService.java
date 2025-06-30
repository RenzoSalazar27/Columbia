package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UsuarioDTO;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos los usuarios
    public List<UsuarioDTO> listarTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Obtener usuario por ID
    public UsuarioDTO obtenerUsuarioPorId(String idUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        if (usuario.isEmpty()) {
            throw new RuntimeException("Usuario con ID " + idUsuario + " no encontrado");
        }
        return convertirADTO(usuario.get());
    }

    // Login de usuario
    public Map<String, Object> login(String emailUsuario, String contrasenaUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findByEmailUsuario(emailUsuario);
        
        if (usuario.isEmpty()) {
            throw new RuntimeException("Email o contraseña incorrectos");
        }
        
        Usuario usuarioEncontrado = usuario.get();
        
        if (!usuarioEncontrado.getContrasenaUsuario().equals(contrasenaUsuario)) {
            throw new RuntimeException("Email o contraseña incorrectos");
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("usuario", convertirADTO(usuarioEncontrado));
        response.put("mensaje", "Login exitoso");
        
        return response;
    }

    // Registro de usuario
    public Map<String, Object> registro(String nombreUsuario, String apellidoUsuario, 
                                       String emailUsuario, String telefonoUsuario, 
                                       LocalDate fechaNacimientoUsuario, String contrasenaUsuario) {
        
        // Validar que el email no exista
        if (usuarioRepository.existsByEmailUsuario(emailUsuario)) {
            throw new RuntimeException("El email " + emailUsuario + " ya está registrado");
        }

        // Generar ID único
        String idUsuario = generarIdUsuario();

        // Crear entidad Usuario
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(idUsuario);
        usuario.setNombreUsuario(nombreUsuario);
        usuario.setApellidoUsuario(apellidoUsuario);
        usuario.setEmailUsuario(emailUsuario);
        usuario.setTelefonoUsuario(telefonoUsuario);
        usuario.setFechaNacimientoUsuario(fechaNacimientoUsuario);
        usuario.setContrasenaUsuario(contrasenaUsuario);
        usuario.setFechaRegistroUsuario(LocalDate.now());
        usuario.setEsAdminUsuario(false);

        // Guardar en base de datos
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // Retornar respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("usuario", convertirADTO(usuarioGuardado));
        response.put("mensaje", "Usuario registrado exitosamente");
        
        return response;
    }

    // Validar contraseña actual
    public Map<String, Object> validarContrasena(String idUsuario, String contrasenaActual) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        
        if (usuario.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        
        Usuario usuarioEncontrado = usuario.get();
        boolean esValida = usuarioEncontrado.getContrasenaUsuario().equals(contrasenaActual);
        
        Map<String, Object> response = new HashMap<>();
        response.put("esValida", esValida);
        
        return response;
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminar(String idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    // Crear usuario
    public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
        // Validar que el ID no exista
        if (usuarioRepository.existsById(usuarioDTO.getIdUsuario())) {
            throw new RuntimeException("El usuario con ID " + usuarioDTO.getIdUsuario() + " ya existe");
        }

        // Validar que el email no exista
        if (usuarioRepository.existsByEmailUsuario(usuarioDTO.getEmailUsuario())) {
            throw new RuntimeException("El email " + usuarioDTO.getEmailUsuario() + " ya está registrado");
        }

        // Crear entidad Usuario
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(usuarioDTO.getIdUsuario());
        usuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
        usuario.setApellidoUsuario(usuarioDTO.getApellidoUsuario());
        usuario.setEmailUsuario(usuarioDTO.getEmailUsuario());
        usuario.setContrasenaUsuario(usuarioDTO.getContrasenaUsuario());
        usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuario());
        usuario.setTelefonoUsuario(usuarioDTO.getTelefonoUsuario());
        usuario.setFechaNacimientoUsuario(usuarioDTO.getFechaNacimientoUsuario());
        usuario.setFechaRegistroUsuario(usuarioDTO.getFechaRegistroUsuario() != null ? 
            usuarioDTO.getFechaRegistroUsuario() : LocalDate.now());
        usuario.setEsAdminUsuario(usuarioDTO.getEsAdminUsuario() != null ? 
            usuarioDTO.getEsAdminUsuario() : false);

        // Guardar en base de datos
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // Retornar DTO
        return convertirADTO(usuarioGuardado);
    }

    // Actualizar usuario
    public UsuarioDTO actualizarUsuario(String idUsuario, UsuarioDTO usuarioDTO) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(idUsuario);
        
        if (usuarioExistente.isEmpty()) {
            throw new RuntimeException("Usuario con ID " + idUsuario + " no encontrado");
        }

        Usuario usuario = usuarioExistente.get();
        
        // Actualizar campos
        if (usuarioDTO.getNombreUsuario() != null) {
            usuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
        }
        if (usuarioDTO.getApellidoUsuario() != null) {
            usuario.setApellidoUsuario(usuarioDTO.getApellidoUsuario());
        }
        if (usuarioDTO.getEmailUsuario() != null) {
            // Validar que el email no esté en uso por otro usuario
            if (!usuarioDTO.getEmailUsuario().equals(usuario.getEmailUsuario()) &&
                usuarioRepository.existsByEmailUsuario(usuarioDTO.getEmailUsuario())) {
                throw new RuntimeException("El email " + usuarioDTO.getEmailUsuario() + " ya está registrado");
            }
            usuario.setEmailUsuario(usuarioDTO.getEmailUsuario());
        }
        if (usuarioDTO.getContrasenaUsuario() != null) {
            usuario.setContrasenaUsuario(usuarioDTO.getContrasenaUsuario());
        }
        if (usuarioDTO.getDireccionUsuario() != null) {
            usuario.setDireccionUsuario(usuarioDTO.getDireccionUsuario());
        }
        if (usuarioDTO.getTelefonoUsuario() != null) {
            usuario.setTelefonoUsuario(usuarioDTO.getTelefonoUsuario());
        }
        if (usuarioDTO.getFechaNacimientoUsuario() != null) {
            usuario.setFechaNacimientoUsuario(usuarioDTO.getFechaNacimientoUsuario());
        }
        if (usuarioDTO.getEsAdminUsuario() != null) {
            usuario.setEsAdminUsuario(usuarioDTO.getEsAdminUsuario());
        }

        // Guardar cambios
        Usuario usuarioActualizado = usuarioRepository.save(usuario);
        
        return convertirADTO(usuarioActualizado);
    }

    // Eliminar usuario
    public void eliminarUsuario(String idUsuario) {
        if (!usuarioRepository.existsById(idUsuario)) {
            throw new RuntimeException("Usuario con ID " + idUsuario + " no encontrado");
        }
        usuarioRepository.deleteById(idUsuario);
    }

    // Método auxiliar para generar ID único
    private String generarIdUsuario() {
        // Generar un ID de 8 caracteres alfanuméricos
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder id = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            int index = (int) (Math.random() * caracteres.length());
            id.append(caracteres.charAt(index));
        }
        
        // Verificar que el ID no exista
        if (usuarioRepository.existsById(id.toString())) {
            return generarIdUsuario(); // Recursión si el ID ya existe
        }
        
        return id.toString();
    }

    // Método auxiliar para convertir entidad a DTO
    private UsuarioDTO convertirADTO(Usuario usuario) {
        return new UsuarioDTO(
            usuario.getIdUsuario(),
            usuario.getNombreUsuario(),
            usuario.getApellidoUsuario(),
            usuario.getEmailUsuario(),
            usuario.getContrasenaUsuario(),
            usuario.getDireccionUsuario(),
            usuario.getTelefonoUsuario(),
            usuario.getFechaNacimientoUsuario(),
            usuario.getFechaRegistroUsuario(),
            usuario.getEsAdminUsuario()
        );
    }
}
