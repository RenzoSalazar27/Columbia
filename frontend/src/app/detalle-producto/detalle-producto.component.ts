import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../Services/producto.service';
import { CarritoService } from '../Services/carrito.service';
import { CarritoNotifierService } from '../app.component';
import { finalize } from 'rxjs';

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
    const idCarrito = Number(localStorage.getItem('idCarrito'));
    const usuarioStr = localStorage.getItem('usuario');
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
    if (!idCarrito || !usuario) {
      this.showToast('Debes iniciar sesión para agregar al carrito', 'error');
      return;
    }
    this.toastMsg = '';
    const item = {
      idCarrito: idCarrito,
      idProducto: this.producto.idProducto,
      cantidadItemCarrito: 1,
      idUsuario: usuario.idUsuario
    };
    let exitoMostrado = false;
    this.carritoService.agregarItem(item)
      .pipe(finalize(() => {
        if (!exitoMostrado && !this.toastMsg) {
          this.showToast('Error al agregar al carrito', 'error');
        }
      }))
      .subscribe({
        next: () => {
          exitoMostrado = true;
          this.showToast('Producto agregado al carrito', 'success');
          this.carritoNotifier.notify();
        },
        error: (error) => {
          if (error.status === 200) {
            this.showToast('Producto agregado al carrito', 'success');
            this.carritoNotifier.notify();
            exitoMostrado = true;
            return;
          }
          if (error && error.error && typeof error.error === 'string' && error.error.includes('no pertenece al usuario')) {
            this.showToast('No puedes agregar productos a un carrito que no es tuyo.', 'error');
          } else {
            this.showToast('Error al agregar al carrito', 'error');
          }
        }
      });
  }

  showToast(msg: string, type: 'success' | 'error') {
    this.toastMsg = msg;
    this.toastType = type;
    setTimeout(() => this.toastMsg = '', 2000);
  }

  getImagenProducto(producto: any): string {
    if (producto.imagenProducto && producto.imagenProducto.trim() !== '') {
      return producto.imagenProducto;
    }
    if (producto.categoria?.nombreCategoria) {
      switch (producto.categoria.nombreCategoria.toLowerCase()) {
        case 'camisetas':
          return 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80';
        case 'pantalones':
          return 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80';
        case 'calzado':
          return 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=500&q=80';
        case 'accesorios':
          return 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80';
        case 'shorts':
          return 'https://images.unsplash.com/photo-1469398715555-76331a6c7fa0?auto=format&fit=crop&w=500&q=80';
        case 'chalecos':
          return 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80';
        // Puedes agregar más categorías aquí
      }
    }
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80';
  }
} 