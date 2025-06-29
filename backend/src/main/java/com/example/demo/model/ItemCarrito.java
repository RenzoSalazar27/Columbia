package com.example.demo.model;

import jakarta.persistence.*;


@Entity
@Table(name = "item_carrito")
public class ItemCarrito {
    @Id
    @Column(name = "id_item_carrito", length = 10)
    private String idItemCarrito;

    @ManyToOne
    @JoinColumn(name = "id_carrito", nullable = false)
    private Carrito carrito;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad_item_carrito", nullable = false)
    private Integer cantidadItemCarrito;

	public String getIdItemCarrito() {
		return idItemCarrito;
	}

	public void setIdItemCarrito(String idItemCarrito) {
		this.idItemCarrito = idItemCarrito;
	}

	public Carrito getCarrito() {
		return carrito;
	}

	public void setCarrito(Carrito carrito) {
		this.carrito = carrito;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Integer getCantidadItemCarrito() {
		return cantidadItemCarrito;
	}

	public void setCantidadItemCarrito(Integer cantidadItemCarrito) {
		this.cantidadItemCarrito = cantidadItemCarrito;
	}

    // Getters y setters
    
    
    
}