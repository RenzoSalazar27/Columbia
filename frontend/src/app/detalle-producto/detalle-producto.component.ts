import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../Services/producto.service';
import { CarritoService } from '../Services/carrito.service';
import { CarritoNotifierService } from '../app.component';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  producto: Producto | null = null;
  cargando = false;
  error = false;
  mensaje: string = '';
  toastMsg: string = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private carritoNotifier: CarritoNotifierService
  ) {}

  ngOnInit(): void {
    const productoGuardado = localStorage.getItem('productoDetalle');
    if (productoGuardado) {
      this.producto = JSON.parse(productoGuardado);
      localStorage.removeItem('productoDetalle');
    } else {
      // Buscar por ID si no hay en localStorage
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.cargando = true;
        this.productoService.getProducto(+id).subscribe({
          next: (prod: Producto) => {
            this.producto = prod;
            this.cargando = false;
          },
          error: () => {
            this.error = true;
            this.cargando = false;
          }
        });
      } else {
        this.error = true;
      }
    }
  }

  cerrarPestana() {
    window.close();
  }

  esFavorito(producto: Producto | null): boolean {
    if (!producto) return false;
    const favs = JSON.parse(localStorage.getItem('favoritosProductos') || '[]');
    return favs.some((p: Producto) => p.idProducto === producto.idProducto);
  }

  toggleFavorito(producto: Producto | null) {
    if (!producto) return;
    let favs = JSON.parse(localStorage.getItem('favoritosProductos') || '[]');
    if (favs.some((p: Producto) => p.idProducto === producto.idProducto)) {
      favs = favs.filter((p: Producto) => p.idProducto !== producto.idProducto);
    } else {
      favs.push(producto);
    }
    localStorage.setItem('favoritosProductos', JSON.stringify(favs));
  }

  agregarAlCarrito() {
    if (!this.producto) return;
    const item = {
      idCarrito: 1, // Ajustar lógica de idCarrito según usuario
      idProducto: this.producto.idProducto,
      cantidadItemCarrito: 1
    };
    this.carritoService.agregarItem(item).subscribe({
      next: () => {
        this.showToast('Producto agregado al carrito', 'success');
        this.carritoNotifier.notify();
      },
      error: () => {
        this.showToast('Error al agregar al carrito', 'error');
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error') {
    this.toastMsg = msg;
    this.toastType = type;
    setTimeout(() => this.toastMsg = '', 2000);
  }
} 