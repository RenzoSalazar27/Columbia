package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


@Entity
@Table(name = "item_carrito")
public class ItemCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item_carrito")
    private int idItemCarrito;

    @ManyToOne
    @JoinColumn(name = "id_carrito", nullable = false)
    @JsonIgnore
    private Carrito carrito;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad_item_carrito", nullable = false)
    private Integer cantidadItemCarrito;

	public int getIdItemCarrito() {
		return idItemCarrito;
	}

	public void setIdItemCarrito(int idItemCarrito) {
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