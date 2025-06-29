package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "descuento")
public class Descuento {
    @Id
    @Column(name = "id_descuento", length = 10)
    private String idDescuento;

    @Column(name = "porcentaje_descuento", nullable = false)
    private Double porcentajeDescuento;

    @Column(name = "fecha_inicio_descuento", nullable = false)
    private LocalDate fechaInicioDescuento;

    @Column(name = "fecha_fin_descuento", nullable = false)
    private LocalDate fechaFinDescuento;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

	public String getIdDescuento() {
		return idDescuento;
	}

	public void setIdDescuento(String idDescuento) {
		this.idDescuento = idDescuento;
	}

	public Double getPorcentajeDescuento() {
		return porcentajeDescuento;
	}

	public void setPorcentajeDescuento(Double porcentajeDescuento) {
		this.porcentajeDescuento = porcentajeDescuento;
	}

	public LocalDate getFechaInicioDescuento() {
		return fechaInicioDescuento;
	}

	public void setFechaInicioDescuento(LocalDate fechaInicioDescuento) {
		this.fechaInicioDescuento = fechaInicioDescuento;
	}

	public LocalDate getFechaFinDescuento() {
		return fechaFinDescuento;
	}

	public void setFechaFinDescuento(LocalDate fechaFinDescuento) {
		this.fechaFinDescuento = fechaFinDescuento;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}
 
    
    
}