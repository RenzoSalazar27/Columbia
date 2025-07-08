import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from '../Services/producto.service';

@Component({
  selector: 'app-favoritos-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos-productos.component.html',
  styleUrls: ['./favoritos-productos.component.css']
})
export class FavoritosProductosComponent implements OnInit {
  favoritos: Producto[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const favs = localStorage.getItem('favoritosProductos');
    if (favs) {
      this.favoritos = JSON.parse(favs);
    }
  }

  verProducto(producto: Producto) {
    localStorage.setItem('productoDetalle', JSON.stringify(producto));
    this.router.navigate([`/detalle-producto/${producto.idProducto}`]);
  }

  quitarFavorito(id: number) {
    this.favoritos = this.favoritos.filter(p => p.idProducto !== id);
    localStorage.setItem('favoritosProductos', JSON.stringify(this.favoritos));
  }
} 