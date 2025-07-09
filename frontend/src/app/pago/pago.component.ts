import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../Services/carrito.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  metodoPago: string = 'tarjeta';
  numeroTarjeta: string = '';
  nombreTitular: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';
  mostrarExito: boolean = false;
  mensaje: string = '';

  constructor(private router: Router, private carritoService: CarritoService) {}

  async pagar() {
    const usuarioStr = localStorage.getItem('usuario');
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
    const montoPago = Number(localStorage.getItem('totalCarrito')) || 100;
    let idPedido = localStorage.getItem('idPedido');
    // Si no hay pedido, crearlo
    if ((!idPedido || isNaN(Number(idPedido))) && usuario) {
      const pedido = {
        usuario: { idUsuario: usuario.idUsuario },
        fechaPedido: new Date().toISOString().slice(0, 10),
        totalPedido: montoPago,
        estadoPedido: 'Pendiente'
      };
      try {
        const resp: any = await this.carritoService.crearPedido(pedido).toPromise();
        const idPedidoSeguro = resp.idPedido ?? 0;
        idPedido = idPedidoSeguro;
        localStorage.setItem('idPedido', idPedidoSeguro.toString());
      } catch (e) {
        this.mensaje = 'Error al crear el pedido';
        setTimeout(() => this.mensaje = '', 3000);
        return;
      }
    }
    if (!idPedido || isNaN(Number(idPedido))) {
      this.mensaje = 'No se pudo obtener el pedido';
      setTimeout(() => this.mensaje = '', 3000);
      return;
    }
    const idPedidoSeguro = idPedido ?? '0';
    const pago: any = {
      montoPago: montoPago,
      metodoPago: this.metodoPago,
      estadoPago: 'Exitoso',
      fechaPago: new Date().toISOString().slice(0, 10),
      pedido: { idPedido: Number(idPedidoSeguro) }
    };
    this.carritoService.registrarPago(pago).subscribe({
      next: () => {
        // Vaciar el carrito después del pago exitoso
        const idCarrito = Number(localStorage.getItem('idCarrito'));
        if (idCarrito) {
          this.carritoService.vaciarCarrito(idCarrito).subscribe(() => {
            this.mostrarExito = true;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2500);
          });
        } else {
          this.mostrarExito = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2500);
        }
      },
      error: () => {
        this.mensaje = 'Error al procesar el pago';
        setTimeout(() => this.mensaje = '', 3000);
      }
    });
  }

  formValido(): boolean {
    if (this.metodoPago === 'tarjeta') {
      return (
        this.numeroTarjeta.trim().length === 16 &&
        this.nombreTitular.trim().length > 0 &&
        /^\d{2}\/\d{2}$/.test(this.fechaExpiracion) &&
        this.cvv.trim().length >= 3 && this.cvv.trim().length <= 4
      );
    } else if (this.metodoPago === 'transferencia') {
      // Aquí podrías agregar validaciones para transferencia
      return true;
    }
    return false;
  }

  isFechaExpiracionInvalida(): boolean {
    if (!this.fechaExpiracion) return false;
    return !/^\d{2}\/\d{2}$/.test(this.fechaExpiracion);
  }
} 