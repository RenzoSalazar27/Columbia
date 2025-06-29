package com.example.demo.dto;

import java.time.LocalDate;

public class UsuarioDireccionDTO {
    private String idUsuario;
    private String nombreUsuario;
    private String apellidoUsuario;
    private String emailUsuario;
    private String telefonoUsuario;
    private String idDireccionEntrega;
    private String direccionEntrega;
    private String ciudadEntrega;
    private String distritoEntrega;
    private String referenciaEntrega;

    // Constructor
    public UsuarioDireccionDTO() {}

    public UsuarioDireccionDTO(String idUsuario, String nombreUsuario, String apellidoUsuario, 
                              String emailUsuario, String telefonoUsuario, String idDireccionEntrega, 
                              String direccionEntrega, String ciudadEntrega, String distritoEntrega, 
                              String referenciaEntrega) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.emailUsuario = emailUsuario;
        this.telefonoUsuario = telefonoUsuario;
        this.idDireccionEntrega = idDireccionEntrega;
        this.direccionEntrega = direccionEntrega;
        this.ciudadEntrega = ciudadEntrega;
        this.distritoEntrega = distritoEntrega;
        this.referenciaEntrega = referenciaEntrega;
    }

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

    public String getTelefonoUsuario() {
        return telefonoUsuario;
    }

    public void setTelefonoUsuario(String telefonoUsuario) {
        this.telefonoUsuario = telefonoUsuario;
    }

    public String getIdDireccionEntrega() {
        return idDireccionEntrega;
    }

    public void setIdDireccionEntrega(String idDireccionEntrega) {
        this.idDireccionEntrega = idDireccionEntrega;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }

    public String getCiudadEntrega() {
        return ciudadEntrega;
    }

    public void setCiudadEntrega(String ciudadEntrega) {
        this.ciudadEntrega = ciudadEntrega;
    }

    public String getDistritoEntrega() {
        return distritoEntrega;
    }

    public void setDistritoEntrega(String distritoEntrega) {
        this.distritoEntrega = distritoEntrega;
    }

    public String getReferenciaEntrega() {
        return referenciaEntrega;
    }

    public void setReferenciaEntrega(String referenciaEntrega) {
        this.referenciaEntrega = referenciaEntrega;
    }
} 