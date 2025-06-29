package com.example.demo.repository;

import com.example.demo.model.DireccionEntrega;
import com.example.demo.dto.UsuarioDireccionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DireccionEntregaRepository extends JpaRepository<DireccionEntrega, String> {
    // Métodos personalizados
    List<DireccionEntrega> findByUsuarioIdUsuario(String idUsuario);
    boolean existsByUsuarioIdUsuario(String idUsuario);

    // Consulta 1: JPQL - Obtener usuarios con sus direcciones de entrega
    @Query("SELECT new com.example.demo.dto.UsuarioDireccionDTO(" +
           "u.idUsuario, u.nombreUsuario, u.apellidoUsuario, u.emailUsuario, u.telefonoUsuario, " +
           "d.idDireccionEntrega, d.direccionEntrega, d.ciudadEntrega, d.distritoEntrega, d.referenciaEntrega) " +
           "FROM Usuario u " +
           "JOIN u.direccionesEntrega d " +
           "ORDER BY u.nombreUsuario, d.distritoEntrega")
    List<UsuarioDireccionDTO> obtenerUsuariosConDireccionesJPQL();

    // Consulta 2: SQL Nativo - Obtener usuarios con direcciones usando INNER JOIN
    @Query(value = "SELECT u.id_usuario, u.nombre_usuario, u.apellido_usuario, u.email_usuario, u.telefono_usuario, " +
                   "d.id_direccion_entrega, d.direccion_entrega, d.ciudad_entrega, d.distrito_entrega, d.referencia_entrega " +
                   "FROM usuario u " +
                   "INNER JOIN direccion_entrega d ON u.id_usuario = d.id_usuario " +
                   "ORDER BY u.nombre_usuario, d.distrito_entrega", 
           nativeQuery = true)
    List<Object[]> obtenerUsuariosConDireccionesSQL();

    // Consulta adicional: JPQL con filtro por distrito
    @Query("SELECT new com.example.demo.dto.UsuarioDireccionDTO(" +
           "u.idUsuario, u.nombreUsuario, u.apellidoUsuario, u.emailUsuario, u.telefonoUsuario, " +
           "d.idDireccionEntrega, d.direccionEntrega, d.ciudadEntrega, d.distritoEntrega, d.referenciaEntrega) " +
           "FROM Usuario u " +
           "JOIN u.direccionesEntrega d " +
           "WHERE d.distritoEntrega = :distrito " +
           "ORDER BY u.nombreUsuario")
    List<UsuarioDireccionDTO> obtenerUsuariosPorDistritoJPQL(@Param("distrito") String distrito);
}
