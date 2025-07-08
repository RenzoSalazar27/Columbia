import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../Services/carrito.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CarritoNotifierService } from '../app.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  isLoggedIn: boolean = false;
  toastMsg: string = '';
  toastType: 'success' | 'error' = 'success';
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  private carritoNotifier = inject(CarritoNotifierService);

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('usuario');
    this.carritoNotifier.carritoChanged$.subscribe(() => {
      this.cargarCarrito();
    });
    this.cargarCarrito();
  }

  cargarCarrito() {
    const idCarrito = Number(localStorage.getItem('idCarrito'));
    if (!idCarrito) {
      this.items = [];
      return;
    }
    this.carritoService.obtenerCarrito(idCarrito).subscribe({
      next: (carrito: any) => {
        this.items = carrito.itemsCarrito || [];
      },
      error: () => {
        this.items = [];
      }
    });
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.producto.precio * item.cantidadItemCarrito, 0);
  }

  eliminarItem(item: any) {
    this.carritoService.eliminarItem(item.idItemCarrito).subscribe({
      next: () => {
        this.cargarCarrito();
        this.carritoNotifier.notify();
        this.showToast('Producto eliminado del carrito', 'success');
      },
      error: () => {
        this.showToast('Error al eliminar del carrito', 'error');
      }
    });
  }

  showToast(msg: string, type: 'success' | 'error') {
    this.toastMsg = msg;
    this.toastType = type;
    setTimeout(() => this.toastMsg = '', 2000);
  }

  openLogin() {
    window.dispatchEvent(new CustomEvent('openLoginModal'));
  }
} 