import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CategoriaService, Categoria } from '../categoria.service';

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

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCategorias();
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