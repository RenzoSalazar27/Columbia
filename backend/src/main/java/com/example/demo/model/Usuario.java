package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @Column(name = "id_usuario", length = 10)
    private String idUsuario;

    @Column(name = "nombre_usuario", length = 100, nullable = false)
    private String nombreUsuario;

    @Column(name = "apellido_usuario", length = 100, nullable = false)
    private String apellidoUsuario;

    @Column(name = "email_usuario", length = 100, nullable = false)
    private String emailUsuario;

    @Column(name = "contraseña_usuario", length = 255, nullable = false)
    private String contrasenaUsuario;

    @Column(name = "direccion_usuario", length = 255, nullable = false)
    private String direccionUsuario;

    @Column(name = "telefono_usuario", length = 20, nullable = false)
    private String telefonoUsuario;

    @Column(name = "fecha_registro_usuario", nullable = false)
    private LocalDate fechaRegistroUsuario;

    @Column(name = "es_admin_usuario", nullable = false)
    private Boolean esAdminUsuario;

    @OneToMany(mappedBy = "usuario")
    private List<Carrito> carritos;

    @OneToMany(mappedBy = "usuario")
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "usuario")
    private List<DireccionEntrega> direccionesEntrega;

    @OneToMany(mappedBy = "usuario")
    private List<Pedido> pedidos;

    // Getters y Setters
    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getApellidoUsuario() {
        return apellidoUsuario;
    }

    public void setApellidoUsuario(String apellidoUsuario) {
        this.apellidoUsuario = apellidoUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public String getContrasenaUsuario() {
        return contrasenaUsuario;
    }

    public void setContrasenaUsuario(String contrasenaUsuario) {
        this.contrasenaUsuario = contrasenaUsuario;
    }

    public String getDireccionUsuario() {
        return direccionUsuario;
    }

    public void setDireccionUsuario(String direccionUsuario) {
        this.direccionUsuario = direccionUsuario;
    }

    public String getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(String telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    public LocalDate getFechaRegistroUsuario() {
        return fechaRegistroUsuario;
    }

    public void setFechaRegistroUsuario(LocalDate fechaRegistroUsuario) {
        this.fechaRegistroUsuario = fechaRegistroUsuario;
    }

    public Boolean getEsAdminUsuario() {
        return esAdminUsuario;
    }

    public void setEsAdminUsuario(Boolean esAdminUsuario) {
        this.esAdminUsuario = esAdminUsuario;
    }
}