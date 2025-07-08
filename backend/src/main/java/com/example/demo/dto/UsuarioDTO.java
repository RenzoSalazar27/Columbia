package com.example.demo.dto;

import java.time.LocalDate;

public class UsuarioDTO {
    private Integer idUsuario;
    private String nombreUsuario;
    private String apellidoUsuario;
    private String emailUsuario;
    private String contrasenaUsuario;
    private String direccionUsuario;
    private String telefonoUsuario;
    private LocalDate fechaNacimientoUsuario;
    private LocalDate fechaRegistroUsuario;
    private Boolean esAdminUsuario;

    // Constructores
    public UsuarioDTO() {}

    public UsuarioDTO(Integer idUsuario, String nombreUsuario, String apellidoUsuario, 
                     String emailUsuario, String contrasenaUsuario, String direccionUsuario, 
                     String telefonoUsuario, LocalDate fechaNacimientoUsuario, LocalDate fechaRegistroUsuario, Boolean esAdminUsuario) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.emailUsuario = emailUsuario;
        this.contrasenaUsuario = contrasenaUsuario;
        this.direccionUsuario = direccionUsuario;
        this.telefonoUsuario = telefonoUsuario;
        this.fechaNacimientoUsuario = fechaNacimientoUsuario;
        this.fechaRegistroUsuario = fechaRegistroUsuario;
        this.esAdminUsuario = esAdminUsuario;
    }

    // Getters y Setters
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
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

    public LocalDate getFechaNacimientoUsuario() {
        return fechaNacimientoUsuario;
    }

    public void setFechaNacimientoUsuario(LocalDate fechaNacimientoUsuario) {
        this.fechaNacimientoUsuario = fechaNacimientoUsuario;
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