package com.example.demo.model;


import jakarta.persistence.*;

import java.time.LocalDate;



@Entity
@Table(name = "comentario")
public class Comentario {
    @Id
    @Column(name = "id_comentario", length = 10)
    private String idComentario;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "calificacion_comentario", nullable = false)
    private Integer calificacionComentario;

    @Column(name = "texto_comentario", columnDefinition = "TEXT", nullable = false)
    private String textoComentario;

    @Column(name = "fecha_comentario", nullable = false)
    private LocalDate fechaComentario;

	public String getIdComentario() {
		return idComentario;
	}

	public void setIdComentario(String idComentario) {
		this.idComentario = idComentario;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Integer getCalificacionComentario() {
		return calificacionComentario;
	}

	public void setCalificacionComentario(Integer calificacionComentario) {
		this.calificacionComentario = calificacionComentario;
	}

	public String getTextoComentario() {
		return textoComentario;
	}

	public void setTextoComentario(String textoComentario) {
		this.textoComentario = textoComentario;
	}

	public LocalDate getFechaComentario() {
		return fechaComentario;
	}

	public void setFechaComentario(LocalDate fechaComentario) {
		this.fechaComentario = fechaComentario;
	}

    // Getters y Setters

    
    
}
