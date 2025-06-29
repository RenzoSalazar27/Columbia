package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

// ======================= CARRITO =======================
@Entity
@Table(name = "carrito")
public class Carrito {
    @Id
    @Column(name = "id_carrito", length = 10)
    private String idCarrito;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_creacion_carrito", nullable = false)
    private LocalDate fechaCreacionCarrito;

    @OneToMany(mappedBy = "carrito")
    private List<ItemCarrito> itemsCarrito;

	public String getIdCarrito() {
		return idCarrito;
	}

	public void setIdCarrito(String idCarrito) {
		this.idCarrito = idCarrito;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public LocalDate getFechaCreacionCarrito() {
		return fechaCreacionCarrito;
	}

	public void setFechaCreacionCarrito(LocalDate fechaCreacionCarrito) {
		this.fechaCreacionCarrito = fechaCreacionCarrito;
	}

	public List<ItemCarrito> getItemsCarrito() {
		return itemsCarrito;
	}

	public void setItemsCarrito(List<ItemCarrito> itemsCarrito) {
		this.itemsCarrito = itemsCarrito;
	}
    

    
}