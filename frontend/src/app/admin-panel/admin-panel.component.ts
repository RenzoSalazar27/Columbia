import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  // Datos de ejemplo para el dashboard
  estadisticas = {
    ventasHoy: 15420,
    ventasMes: 458750,
    pedidosPendientes: 23,
    productosStock: 156,
    clientesNuevos: 45,
    productosVendidos: 89
  };

  productosRecientes = [
    {
      id: 1,
      nombre: 'Chaqueta Columbia Omni-Heat',
      categoria: 'Ropa de Hombre',
      precio: 299.99,
      stock: 15,
      vendidos: 23
    },
    {
      id: 2,
      nombre: 'Botas Columbia Bugaboot',
      categoria: 'Calzado',
      precio: 199.99,
      stock: 8,
      vendidos: 12
    },
    {
      id: 3,
      nombre: 'Pantalón Columbia Silver Ridge',
      categoria: 'Ropa de Mujer',
      precio: 89.99,
      stock: 22,
      vendidos: 18
    },
    {
      id: 4,
      nombre: 'Mochila Columbia OutDry',
      categoria: 'Accesorios',
      precio: 149.99,
      stock: 5,
      vendidos: 31
    }
  ];

  pedidosRecientes = [
    {
      id: 'PED001',
      cliente: 'Juan Pérez',
      total: 459.98,
      estado: 'Pendiente',
      fecha: '2024-01-15',
      items: 3
    },
    {
      id: 'PED002',
      cliente: 'María García',
      total: 299.99,
      estado: 'Enviado',
      fecha: '2024-01-14',
      items: 1
    },
    {
      id: 'PED003',
      cliente: 'Carlos López',
      total: 789.97,
      estado: 'Entregado',
      fecha: '2024-01-13',
      items: 4
    },
    {
      id: 'PED004',
      cliente: 'Ana Martínez',
      total: 199.99,
      estado: 'Pendiente',
      fecha: '2024-01-12',
      items: 1
    }
  ];

  categorias = [
    { nombre: 'Ropa de Hombre', productos: 45, ventas: 12500 },
    { nombre: 'Ropa de Mujer', productos: 38, ventas: 9800 },
    { nombre: 'Calzado', productos: 32, ventas: 15600 },
    { nombre: 'Accesorios', productos: 28, ventas: 4200 },
    { nombre: 'Ropa de Niños', productos: 25, ventas: 3800 }
  ];

  seccionSeleccionada: string = 'dashboard';

  constructor() { }

  ngOnInit(): void {
    // Aquí se cargarían los datos reales desde el backend
    console.log('Panel de administrador cargado');
  }

  seleccionarSeccion(seccion: string) {
    this.seccionSeleccionada = seccion;
  }

  // Métodos para las acciones del panel (solo ejemplo)
  editarProducto(id: number) {
    console.log('Editar producto:', id);
  }

  eliminarProducto(id: number) {
    console.log('Eliminar producto:', id);
  }

  verDetallePedido(id: string) {
    console.log('Ver detalle del pedido:', id);
  }

  cambiarEstadoPedido(id: string, nuevoEstado: string) {
    console.log('Cambiar estado del pedido:', id, 'a:', nuevoEstado);
  }

  // Método para formatear números como moneda
  formatearMoneda(valor: number): string {
    return `S/ ${valor.toFixed(2)}`;
  }

  // Método para obtener la clase CSS del estado
  getEstadoClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'estado-pendiente';
      case 'enviado': return 'estado-enviado';
      case 'entregado': return 'estado-entregado';
      case 'cancelado': return 'estado-cancelado';
      default: return 'estado-pendiente';
    }
  }
} 