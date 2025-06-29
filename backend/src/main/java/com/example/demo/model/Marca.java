package com.example.demo.model;

import jakarta.persistence.*;

import java.util.List;

// ======================= MARCA =======================
@Entity
@Table(name = "marca")
public class Marca {
    @Id
    @Column(name = "id_marca", length = 10)
    private String idMarca;

    @Column(name = "nombre_marca", nullable = false, length = 100)
    private String nombreMarca;

    @Column(name = "logo_marca", nullable = false, length = 255)
    private String logoMarca;

    @OneToMany(mappedBy = "marca")
    private List<Producto> productos;

	public String getIdMarca() {
		return idMarca;
	}

	public void setIdMarca(String idMarca) {
		this.idMarca = idMarca;
	}

	public String getNombreMarca() {
		return nombreMarca;
	}

	public void setNombreMarca(String nombreMarca) {
		this.nombreMarca = nombreMarca;
	}

	public String getLogoMarca() {
		return logoMarca;
	}

	public void setLogoMarca(String logoMarca) {
		this.logoMarca = logoMarca;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

    
}