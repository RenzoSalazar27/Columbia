import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CategoriaService, Categoria } from '../categoria.service';
import { ClienteService, Cliente } from '../cliente.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  // Navegación
  seccionSeleccionada: string = 'dashboard';
  
  // Categorías
  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria | null = null;
  nuevaCategoria: Categoria = {
    idCategoria: 0,
    nombreCategoria: '',
    descripcionCategoria: ''
  };
  
  // Estados de modales
  mostrarModalCrearCategoria = false;
  mostrarModalEditarCategoria = false;
  mostrarModalEliminarCategoria = false;
  
  // Estados de carga
  cargandoCategorias = false;
  errorCargarCategorias = false;
  
  // Estados de acciones
  cargandoCrear = false;
  cargandoEditar = false;
  cargandoEliminar = false;
  
  // Notificaciones
  mostrarNotificacion = false;
  tipoNotificacion: 'success' | 'error' | 'warning' = 'success';
  mensajeNotificacion = '';

  // Clientes
  clientes: Cliente[] = [];
  cantidadClientes: number = 0;
  cargandoClientes = false;
  errorCargarClientes = false;
  clienteSeleccionado: Cliente | null = null;
  
  // Estados de modales para clientes
  mostrarModalEditarCliente = false;
  mostrarModalEliminarCliente = false;
  
  // Estados de acciones para clientes
  cargandoEditarCliente = false;
  cargandoEliminarCliente = false;

  constructor(
    private categoriaService: CategoriaService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarClientes();
    this.cargarCantidadClientes();
  }

  // Navegación
  seleccionarSeccion(seccion: string) {
    this.seccionSeleccionada = seccion;
  }

  // Cargar categorías desde el backend
  cargarCategorias() {
    this.cargandoCategorias = true;
    this.errorCargarCategorias = false;
    
    this.categoriaService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
        this.cargandoCategorias = false;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
        this.errorCargarCategorias = true;
        this.cargandoCategorias = false;
      }
    });
  }

  // Cargar clientes desde el backend
  cargarClientes() {
    this.cargandoClientes = true;
    this.errorCargarClientes = false;
    
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
        this.cargandoClientes = false;
      },
      error: (error: any) => {
        console.error('Error al cargar clientes:', error);
        this.errorCargarClientes = true;
        this.cargandoClientes = false;
      }
    });
  }

  // Cargar cantidad de clientes para el dashboard
  cargarCantidadClientes() {
    this.clienteService.getCantidadClientes().subscribe({
      next: (response: any) => {
        this.cantidadClientes = response.cantidad;
      },
      error: (error: any) => {
        console.error('Error al cargar cantidad de clientes:', error);
        this.cantidadClientes = 0;
      }
    });
  }

  // Crear nueva categoría
  crearCategoria() {
    if (this.nuevaCategoria.nombreCategoria.trim() && this.nuevaCategoria.descripcionCategoria.trim()) {
      this.cargandoCrear = true;
      
      // Crear objeto sin ID para evitar conflictos
      const categoriaParaCrear = {
        nombreCategoria: this.nuevaCategoria.nombreCategoria,
        descripcionCategoria: this.nuevaCategoria.descripcionCategoria
      };
      
      this.categoriaService.crearCategoria(categoriaParaCrear as Categoria).subscribe({
        next: (categoria: Categoria) => {
          this.categorias.push(categoria);
          this.cerrarModalCrearCategoria();
          this.limpiarNuevaCategoria();
          this.mostrarNotificacionExito('Categoría creada exitosamente');
          this.cargandoCrear = false;
        },
        error: (error: any) => {
          console.error('Error al crear categoría:', error);
          let mensajeError = 'Error al crear la categoría. Por favor, intenta de nuevo.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message;
          } else if (error.message) {
            mensajeError = error.message;
          }
          this.mostrarNotificacionError(mensajeError);
          this.cargandoCrear = false;
        }
      });
    } else {
      this.mostrarNotificacionError('Por favor, completa todos los campos.');
    }
  }

  // Editar categoría
  editarCategoria() {
    if (this.categoriaSeleccionada && 
        this.categoriaSeleccionada.nombreCategoria.trim() && 
        this.categoriaSeleccionada.descripcionCategoria.trim()) {
      
      this.cargandoEditar = true;
      
      this.categoriaService.actualizarCategoria(
        this.categoriaSeleccionada.idCategoria, 
        this.categoriaSeleccionada
      ).subscribe({
        next: (categoria: Categoria) => {
          const index = this.categorias.findIndex(c => c.idCategoria === categoria.idCategoria);
          if (index !== -1) {
            this.categorias[index] = categoria;
          }
          this.cerrarModalEditarCategoria();
          this.mostrarNotificacionExito('Categoría actualizada exitosamente');
          this.cargandoEditar = false;
        },
        error: (error: any) => {
          console.error('Error al actualizar categoría:', error);
          this.mostrarNotificacionError('Error al actualizar la categoría. Por favor, intenta de nuevo.');
          this.cargandoEditar = false;
        }
      });
    } else {
      this.mostrarNotificacionError('Por favor, completa todos los campos.');
    }
  }

  // Eliminar categoría
  eliminarCategoria() {
    if (this.categoriaSeleccionada) {
      this.cargandoEliminar = true;
      
      this.categoriaService.eliminarCategoria(this.categoriaSeleccionada.idCategoria).subscribe({
        next: () => {
          this.categorias = this.categorias.filter(c => c.idCategoria !== this.categoriaSeleccionada!.idCategoria);
          this.cerrarModalEliminarCategoria();
          this.mostrarNotificacionExito('Categoría eliminada exitosamente');
          this.cargandoEliminar = false;
        },
        error: (error: any) => {
          console.error('Error al eliminar categoría:', error);
          this.mostrarNotificacionError('Error al eliminar la categoría. Por favor, intenta de nuevo.');
          this.cargandoEliminar = false;
        }
      });
    }
  }

  // Abrir modal para crear categoría
  abrirModalCrearCategoria() {
    this.mostrarModalCrearCategoria = true;
  }

  // Cerrar modal de crear categoría
  cerrarModalCrearCategoria() {
    this.mostrarModalCrearCategoria = false;
    this.limpiarNuevaCategoria();
  }

  // Abrir modal para editar categoría
  abrirModalEditarCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = { ...categoria };
    this.mostrarModalEditarCategoria = true;
  }

  // Cerrar modal de editar categoría
  cerrarModalEditarCategoria() {
    this.mostrarModalEditarCategoria = false;
    this.categoriaSeleccionada = null;
  }

  // Abrir modal para eliminar categoría
  abrirModalEliminarCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.mostrarModalEliminarCategoria = true;
  }

  // Cerrar modal de eliminar categoría
  cerrarModalEliminarCategoria() {
    this.mostrarModalEliminarCategoria = false;
    this.categoriaSeleccionada = null;
  }

  // Limpiar formulario de nueva categoría
  limpiarNuevaCategoria() {
    this.nuevaCategoria = {
      idCategoria: 0,
      nombreCategoria: '',
      descripcionCategoria: ''
    };
  }

  // Métodos de notificación
  mostrarNotificacionExito(mensaje: string) {
    this.tipoNotificacion = 'success';
    this.mensajeNotificacion = mensaje;
    this.mostrarNotificacion = true;
    setTimeout(() => {
      this.mostrarNotificacion = false;
    }, 3000);
  }

  mostrarNotificacionError(mensaje: string) {
    this.tipoNotificacion = 'error';
    this.mensajeNotificacion = mensaje;
    this.mostrarNotificacion = true;
    setTimeout(() => {
      this.mostrarNotificacion = false;
    }, 4000);
  }

  mostrarNotificacionAdvertencia(mensaje: string) {
    this.tipoNotificacion = 'warning';
    this.mensajeNotificacion = mensaje;
    this.mostrarNotificacion = true;
    setTimeout(() => {
      this.mostrarNotificacion = false;
    }, 3500);
  }

  cerrarNotificacion() {
    this.mostrarNotificacion = false;
  }

  // Métodos para clientes
  editarCliente() {
    if (this.clienteSeleccionado && 
        this.clienteSeleccionado.nombreUsuario.trim() && 
        this.clienteSeleccionado.apellidoUsuario.trim() &&
        this.clienteSeleccionado.emailUsuario.trim() &&
        this.clienteSeleccionado.telefonoUsuario.trim()) {
      
      this.cargandoEditarCliente = true;
      
      this.clienteService.actualizarCliente(
        this.clienteSeleccionado.idUsuario, 
        this.clienteSeleccionado
      ).subscribe({
        next: (cliente: Cliente) => {
          const index = this.clientes.findIndex(c => c.idUsuario === cliente.idUsuario);
          if (index !== -1) {
            this.clientes[index] = cliente;
          }
          this.cerrarModalEditarCliente();
          this.mostrarNotificacionExito('Cliente actualizado exitosamente');
          this.cargandoEditarCliente = false;
        },
        error: (error: any) => {
          console.error('Error al actualizar cliente:', error);
          this.mostrarNotificacionError('Error al actualizar el cliente. Por favor, intenta de nuevo.');
          this.cargandoEditarCliente = false;
        }
      });
    } else {
      this.mostrarNotificacionError('Por favor, completa todos los campos obligatorios.');
    }
  }

  eliminarCliente() {
    if (this.clienteSeleccionado) {
      this.cargandoEliminarCliente = true;
      
      this.clienteService.eliminarCliente(this.clienteSeleccionado.idUsuario).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.idUsuario !== this.clienteSeleccionado!.idUsuario);
          this.cerrarModalEliminarCliente();
          this.mostrarNotificacionExito('Cliente eliminado exitosamente');
          this.cargandoEliminarCliente = false;
          // Actualizar contador
          this.cargarCantidadClientes();
        },
        error: (error: any) => {
          console.error('Error al eliminar cliente:', error);
          this.mostrarNotificacionError('Error al eliminar el cliente. Por favor, intenta de nuevo.');
          this.cargandoEliminarCliente = false;
        }
      });
    }
  }

  // Abrir modal para editar cliente
  abrirModalEditarCliente(cliente: Cliente) {
    this.clienteSeleccionado = { ...cliente };
    this.mostrarModalEditarCliente = true;
  }

  // Cerrar modal de editar cliente
  cerrarModalEditarCliente() {
    this.mostrarModalEditarCliente = false;
    this.clienteSeleccionado = null;
  }

  // Abrir modal para eliminar cliente
  abrirModalEliminarCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.mostrarModalEliminarCliente = true;
  }

  // Cerrar modal de eliminar cliente
  cerrarModalEliminarCliente() {
    this.mostrarModalEliminarCliente = false;
    this.clienteSeleccionado = null;
  }

  // Salir del panel de administrador
  salirAdminPanel() {
    // Mostrar notificación de salida
    this.mostrarNotificacionAdvertencia('Saliendo del panel de administración...');
    
    // Esperar un momento para que se vea la notificación y luego navegar al home
    setTimeout(() => {
      // Navegar al home (ruta vacía) y recargar la página
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }, 1000);
  }
} 