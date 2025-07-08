package com.example.demo.dto;

public class DireccionEntregaDTO {
    private String idDireccionEntrega;
    private Integer idUsuario;
    private String direccionEntrega;
    private String ciudadEntrega;
    private String distritoEntrega;
    private String referenciaEntrega;

    // Constructores
    public DireccionEntregaDTO() {}

    public DireccionEntregaDTO(String idDireccionEntrega, Integer idUsuario, 
                              String direccionEntrega, String ciudadEntrega, 
                              String distritoEntrega, String referenciaEntrega) {
        this.idDireccionEntrega = idDireccionEntrega;
        this.idUsuario = idUsuario;
        this.direccionEntrega = direccionEntrega;
        this.ciudadEntrega = ciudadEntrega;
        this.distritoEntrega = distritoEntrega;
        this.referenciaEntrega = referenciaEntrega;
    }

    // Getters y Setters
    public String getIdDireccionEntrega() {
        return idDireccionEntrega;
    }

    public void setIdDireccionEntrega(String idDireccionEntrega) {
        this.idDireccionEntrega = idDireccionEntrega;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
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