package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.DireccionEntrega;
import com.example.demo.model.Usuario;
import com.example.demo.repository.DireccionEntregaRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.dto.DireccionEntregaDTO;
import com.example.demo.dto.UsuarioDireccionDTO;

@Service
public class DireccionEntregaService {

    @Autowired
    private DireccionEntregaRepository direccionEntregaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todas las direcciones de entrega
    public List<DireccionEntregaDTO> listarTodasLasDirecciones() {
        List<DireccionEntrega> direcciones = direccionEntregaRepository.findAll();
        return direcciones.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Obtener dirección por ID
    public DireccionEntregaDTO obtenerDireccionPorId(String idDireccion) {
        Optional<DireccionEntrega> direccion = direccionEntregaRepository.findById(idDireccion);
        if (direccion.isEmpty()) {
            throw new RuntimeException("Dirección con ID " + idDireccion + " no encontrada");
        }
        return convertirADTO(direccion.get());
    }

    // Consulta 1: JPQL - Obtener usuarios con direcciones
    public List<UsuarioDireccionDTO> obtenerUsuariosConDireccionesJPQL() {
        return direccionEntregaRepository.obtenerUsuariosConDireccionesJPQL();
    }

    // Consulta 2: SQL Nativo - Obtener usuarios con direcciones
    public List<UsuarioDireccionDTO> obtenerUsuariosConDireccionesSQL() {
        List<Object[]> resultados = direccionEntregaRepository.obtenerUsuariosConDireccionesSQL();
        
        return resultados.stream()
                .map(this::convertirObjectArrayADTO)
                .collect(Collectors.toList());
    }

    // Consulta adicional: JPQL con filtro por distrito
    public List<UsuarioDireccionDTO> obtenerUsuariosPorDistritoJPQL(String distrito) {
        return direccionEntregaRepository.obtenerUsuariosPorDistritoJPQL(distrito);
    }

    // Crear dirección de entrega
    public DireccionEntregaDTO crearDireccionEntrega(DireccionEntregaDTO direccionDTO) {
        // Validar que el ID no exista
        if (direccionEntregaRepository.existsById(direccionDTO.getIdDireccionEntrega())) {
            throw new RuntimeException("La dirección con ID " + direccionDTO.getIdDireccionEntrega() + " ya existe");
        }

        // Validar que el usuario existe
        Optional<Usuario> usuario = usuarioRepository.findById(direccionDTO.getIdUsuario());
        if (usuario.isEmpty()) {
            throw new RuntimeException("El usuario con ID " + direccionDTO.getIdUsuario() + " no existe");
        }

        // Crear entidad DireccionEntrega
        DireccionEntrega direccion = new DireccionEntrega();
        direccion.setIdDireccionEntrega(direccionDTO.getIdDireccionEntrega());
        direccion.setUsuario(usuario.get());
        direccion.setDireccionEntrega(direccionDTO.getDireccionEntrega());
        direccion.setCiudadEntrega(direccionDTO.getCiudadEntrega());
        direccion.setDistritoEntrega(direccionDTO.getDistritoEntrega());
        direccion.setReferenciaEntrega(direccionDTO.getReferenciaEntrega());

        // Guardar en base de datos
        DireccionEntrega direccionGuardada = direccionEntregaRepository.save(direccion);

        // Retornar DTO
        return convertirADTO(direccionGuardada);
    }

    // Actualizar dirección de entrega
    public DireccionEntregaDTO actualizarDireccionEntrega(String idDireccion, DireccionEntregaDTO direccionDTO) {
        Optional<DireccionEntrega> direccionExistente = direccionEntregaRepository.findById(idDireccion);
        
        if (direccionExistente.isEmpty()) {
            throw new RuntimeException("Dirección con ID " + idDireccion + " no encontrada");
        }

        DireccionEntrega direccion = direccionExistente.get();
        
        // Actualizar campos
        if (direccionDTO.getIdUsuario() != null) {
            // Validar que el nuevo usuario existe
            Optional<Usuario> nuevoUsuario = usuarioRepository.findById(direccionDTO.getIdUsuario());
            if (nuevoUsuario.isEmpty()) {
                throw new RuntimeException("El usuario con ID " + direccionDTO.getIdUsuario() + " no existe");
            }
            direccion.setUsuario(nuevoUsuario.get());
        }
        if (direccionDTO.getDireccionEntrega() != null) {
            direccion.setDireccionEntrega(direccionDTO.getDireccionEntrega());
        }
        if (direccionDTO.getCiudadEntrega() != null) {
            direccion.setCiudadEntrega(direccionDTO.getCiudadEntrega());
        }
        if (direccionDTO.getDistritoEntrega() != null) {
            direccion.setDistritoEntrega(direccionDTO.getDistritoEntrega());
        }
        if (direccionDTO.getReferenciaEntrega() != null) {
            direccion.setReferenciaEntrega(direccionDTO.getReferenciaEntrega());
        }

        // Guardar cambios
        DireccionEntrega direccionActualizada = direccionEntregaRepository.save(direccion);
        
        return convertirADTO(direccionActualizada);
    }

    // Eliminar dirección de entrega
    public void eliminarDireccionEntrega(String idDireccion) {
        if (!direccionEntregaRepository.existsById(idDireccion)) {
            throw new RuntimeException("Dirección con ID " + idDireccion + " no encontrada");
        }
        direccionEntregaRepository.deleteById(idDireccion);
    }

    // Obtener direcciones por usuario
    public List<DireccionEntregaDTO> obtenerDireccionesPorUsuario(String idUsuario) {
        List<DireccionEntrega> direcciones = direccionEntregaRepository.findByUsuarioIdUsuario(idUsuario);
        return direcciones.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    // Método auxiliar para convertir entidad a DTO
    private DireccionEntregaDTO convertirADTO(DireccionEntrega direccion) {
        return new DireccionEntregaDTO(
            direccion.getIdDireccionEntrega(),
            direccion.getUsuario().getIdUsuario(),
            direccion.getDireccionEntrega(),
            direccion.getCiudadEntrega(),
            direccion.getDistritoEntrega(),
            direccion.getReferenciaEntrega()
        );
    }

    // Método auxiliar para convertir Object[] a UsuarioDireccionDTO (para SQL nativo)
    private UsuarioDireccionDTO convertirObjectArrayADTO(Object[] resultado) {
        return new UsuarioDireccionDTO(
            (String) resultado[0], // idUsuario
            (String) resultado[1], // nombreUsuario
            (String) resultado[2], // apellidoUsuario
            (String) resultado[3], // emailUsuario
            (String) resultado[4], // telefonoUsuario
            (String) resultado[5], // idDireccionEntrega
            (String) resultado[6], // direccionEntrega
            (String) resultado[7], // ciudadEntrega
            (String) resultado[8], // distritoEntrega
            (String) resultado[9]  // referenciaEntrega
        );
    }
}
