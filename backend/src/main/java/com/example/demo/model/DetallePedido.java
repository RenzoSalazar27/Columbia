package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "detalle_pedido")
public class DetallePedido {
    @Id
    @Column(name = "id_detalle_pedido", length = 10)
    private String idDetallePedido;

    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "cantidad_detalle_pedido", nullable = false)
    private Integer cantidadDetallePedido;

    @Column(name = "precio_unitario_detalle_pedido", nullable = false)
    private BigDecimal precioUnitarioDetallePedido;

	public String getIdDetallePedido() {
		return idDetallePedido;
	}

	public void setIdDetallePedido(String idDetallePedido) {
		this.idDetallePedido = idDetallePedido;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Integer getCantidadDetallePedido() {
		return cantidadDetallePedido;
	}

	public void setCantidadDetallePedido(Integer cantidadDetallePedido) {
		this.cantidadDetallePedido = cantidadDetallePedido;
	}

	public BigDecimal getPrecioUnitarioDetallePedido() {
		return precioUnitarioDetallePedido;
	}

	public void setPrecioUnitarioDetallePedido(BigDecimal precioUnitarioDetallePedido) {
		this.precioUnitarioDetallePedido = precioUnitarioDetallePedido;
	}

    
    
    // Getters y setters
}