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
  toastMsg: string = '';
  toastType: 'success' | 'error' = 'success';
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  private carritoNotifier = inject(CarritoNotifierService);
  mostrarModalConfirmacion = false;

  ngOnInit() {
    this.carritoNotifier.carritoChanged$.subscribe(() => {
      this.cargarCarrito();
    });
    this.cargarCarrito();
  }

  cargarCarrito() {
    let idCarrito = Number(localStorage.getItem('idCarrito'));
    if (!idCarrito) {
      // Intentar crear un carrito si no existe
      this.carritoService.crearCarrito(undefined).subscribe({
        next: (nuevoCarrito: any) => {
          if (nuevoCarrito && nuevoCarrito.idCarrito) {
            localStorage.setItem('idCarrito', String(nuevoCarrito.idCarrito));
            idCarrito = nuevoCarrito.idCarrito;
            this.cargarCarrito(); // Recargar con el nuevo idCarrito
          }
        },
        error: () => {
          this.items = [];
        }
      });
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
    return this.items.reduce((acc, item) => acc + (item.producto?.precioProducto || 0) * item.cantidadItemCarrito, 0);
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

  restarUnidad(item: any) {
    if (item.cantidadItemCarrito > 1) {
      const payload: any = {
        idCarrito: Number(localStorage.getItem('idCarrito')),
        idProducto: item.producto.idProducto,
        cantidadItemCarrito: -1
      };
      // Si tienes lógica de usuario, puedes agregar aquí el idUsuario
      this.carritoService.agregarItem(payload).subscribe(() => {
        this.cargarCarrito();
        this.carritoNotifier.notify();
      });
    } else {
      this.eliminarItem(item);
    }
  }

  vaciarCarrito() {
    if (!window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      return;
    }
    const idCarrito = Number(localStorage.getItem('idCarrito'));
    this.carritoService.vaciarCarrito(idCarrito).subscribe({
      next: () => {
        this.cargarCarrito();
        this.carritoNotifier.notify();
        this.showToast('Carrito vaciado', 'success');
      },
      error: () => {
        this.showToast('Error al vaciar el carrito', 'error');
      }
    });
  }

  mostrarConfirmacionVaciar() {
    this.mostrarModalConfirmacion = true;
  }

  cancelarVaciarCarrito() {
    this.mostrarModalConfirmacion = false;
  }

  confirmarVaciarCarrito() {
    this.mostrarModalConfirmacion = false;
    this.vaciarCarrito();
  }

  showToast(msg: string, type: 'success' | 'error') {
    this.toastMsg = msg;
    this.toastType = type;
    setTimeout(() => this.toastMsg = '', 2000);
  }

  openLogin() {
    window.dispatchEvent(new CustomEvent('openLoginModal'));
  }

  irAPago() {
    localStorage.setItem('totalCarrito', this.getTotal().toString());
    this.router.navigate(['/pago']);
  }
} 