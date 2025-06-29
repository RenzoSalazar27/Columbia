package com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name = "direccion_entrega")
public class DireccionEntrega {
    @Id
    @Column(name = "id_direccion_entrega", length = 10)
    private String idDireccionEntrega;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "direccion_entrega", nullable = false, length = 255)
    private String direccionEntrega;

    @Column(name = "ciudad_entrega", nullable = false, length = 100)
    private String ciudadEntrega;

    @Column(name = "distrito_entrega", nullable = false, length = 100)
    private String distritoEntrega;

    @Column(name = "referencia_entrega", nullable = false, length = 255)
    private String referenciaEntrega;

	public String getIdDireccionEntrega() {
		return idDireccionEntrega;
	}

	public void setIdDireccionEntrega(String idDireccionEntrega) {
		this.idDireccionEntrega = idDireccionEntrega;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
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