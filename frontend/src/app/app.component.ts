import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { PerfilModalComponent } from './perfil-modal/perfil-modal.component';
import { CategoriaService, Categoria } from './categoria.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, LoginModalComponent, PerfilModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Columbia Perú';

  // Referencia al modal de login usando ViewChild
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;
  @ViewChild(PerfilModalComponent) perfilModal!: PerfilModalComponent;

  // Estado de autenticación
  isLoggedIn = false;
  currentUser: any = null;

  // Categorías dinámicas
  categorias: Categoria[] = [];
  categoriasCargadas = false;
  errorCargarCategorias = false;

  constructor(private router: Router, private categoriaService: CategoriaService) {}

  ngOnInit() {
    // Verificar si hay un usuario logueado al cargar la página
    this.checkAuthStatus();
    // Cargar categorías dinámicamente
    this.cargarCategorias();
  }

  ngAfterViewInit() {
    // El modal estará disponible después de que se inicialice la vista
    if (this.loginModal) {
      // Suscribirse a eventos del modal
      this.loginModal.authStatusChanged.subscribe((user: any) => {
        this.handleAuthStatusChange(user);
      });
    }
  }

  // Cargar categorías desde el backend
  cargarCategorias() {
    console.log('🔄 Intentando cargar categorías desde:', 'http://localhost:8082/api/categorias');
    
    this.categoriaService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        console.log('✅ Categorías cargadas exitosamente:', categorias);
        this.categorias = categorias;
        this.categoriasCargadas = true;
        this.errorCargarCategorias = false;
      },
      error: (error: any) => {
        console.error('❌ Error al cargar categorías:', error);
        console.error('Detalles del error:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        this.categoriasCargadas = true;
        this.errorCargarCategorias = true;
        // Si no se pueden cargar las categorías, usar un array vacío
        this.categorias = [];
      }
    });
  }

  // Método para abrir el modal de login
  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.showModal();
    }
  }

  // Método para abrir el modal de perfil
  openPerfilModal() {
    if (this.perfilModal) {
      this.perfilModal.usuario = this.currentUser;
      this.perfilModal.mostrarModal();
    }
  }

  // Verificar estado de autenticación
  checkAuthStatus() {
    const userStr = localStorage.getItem('usuario');
    if (userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    } else {
      this.isLoggedIn = false;
      this.currentUser = null;
    }
  }

  // Manejar cambio de estado de autenticación
  handleAuthStatusChange(user: any) {
    if (user) {
      this.currentUser = user;
      this.isLoggedIn = true;
      
      // Refrescar la página automáticamente después del login
      setTimeout(() => {
        window.location.reload();
      }, 100); // Pequeño delay para que se complete el proceso de login
    } else {
      this.logout();
    }
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('usuario');
    this.isLoggedIn = false;
    this.currentUser = null;
    
    // Redirigir a la página principal si está en el panel de admin
    if (this.router.url.includes('/admin')) {
      this.router.navigate(['/']);
    }
    
    // Refrescar la página automáticamente
    window.location.reload();
  }

  // Verificar si estamos en la ruta del panel de administrador
  isAdminRoute(): boolean {
    return this.router.url === '/admin';
  }

  // Obtener el nombre de la categoría para la URL
  getNombreCategoriaParaUrl(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-');
  }
}
