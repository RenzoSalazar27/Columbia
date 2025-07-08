import { Component, ViewChild, AfterViewInit, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { PerfilModalComponent } from './perfil-modal/perfil-modal.component';
import { CategoriaService, Categoria } from './Services/categoria.service';
import { ProductoService, Producto } from './Services/producto.service';
import { FormsModule } from '@angular/forms';
import { CarritoService } from './Services/carrito.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarritoNotifierService {
  private carritoChangedSource = new Subject<void>();
  carritoChanged$ = this.carritoChangedSource.asObservable();
  notify() { this.carritoChangedSource.next(); }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, LoginModalComponent, PerfilModalComponent],
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

  // Productos para sugerencias
  productos: Producto[] = [];
  sugerencias: Array<{ tipo: 'producto' | 'categoria', nombre: string, id?: number }> = [];
  mostrarSugerencias: boolean = false;

  searchTerm: string = '';
  cantidadCarrito: number = 0;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private carritoNotifier: CarritoNotifierService
  ) {}

  ngOnInit() {
    // Verificar si hay un usuario logueado al cargar la página
    this.checkAuthStatus();
    // Cargar categorías dinámicamente
    this.cargarCategorias();
    // Cargar todos los productos para sugerencias
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
    this.carritoNotifier.carritoChanged$.subscribe(() => {
      this.actualizarCantidadCarrito();
    });
    this.actualizarCantidadCarrito();
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

  onSearchSubmit() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return;
    // Buscar si coincide con alguna categoría
    const categoria = this.categorias.find(cat => cat.nombreCategoria.toLowerCase() === term);
    if (categoria) {
      this.router.navigate(['/productos', this.getNombreCategoriaParaUrl(categoria.nombreCategoria)]);
    } else {
      // Si no es categoría, navegar a productos con query param de búsqueda
      this.router.navigate(['/productos'], { queryParams: { q: term } });
    }
  }

  onSearchInput() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.sugerencias = [];
      this.mostrarSugerencias = false;
      return;
    }
    // Buscar coincidencias en categorías
    const catSugs = this.categorias
      .filter(cat => cat.nombreCategoria.toLowerCase().includes(term))
      .map(cat => ({ tipo: 'categoria' as const, nombre: cat.nombreCategoria }));
    // Buscar coincidencias en productos
    const prodSugs = this.productos
      .filter(prod => prod.nombreProducto.toLowerCase().includes(term))
      .map(prod => ({ tipo: 'producto' as const, nombre: prod.nombreProducto, id: prod.idProducto }));
    // Unir y limitar a 6 resultados
    this.sugerencias = [...catSugs, ...prodSugs].slice(0, 6);
    this.mostrarSugerencias = this.sugerencias.length > 0;
  }

  onSugerenciaClick(sug: { tipo: 'producto' | 'categoria', nombre: string, id?: number }) {
    this.mostrarSugerencias = false;
    this.searchTerm = '';
    if (sug.tipo === 'categoria') {
      this.router.navigate(['/productos', this.getNombreCategoriaParaUrl(sug.nombre)]);
    } else if (sug.tipo === 'producto' && sug.id) {
      const producto = this.productos.find(p => p.idProducto === sug.id);
      if (producto) {
        localStorage.setItem('productoDetalle', JSON.stringify(producto));
        this.router.navigate([`/detalle-producto/${producto.idProducto}`]);
      }
    }
  }

  onSearchBlur() {
    setTimeout(() => this.mostrarSugerencias = false, 200);
  }

  actualizarCantidadCarrito() {
    // Suponiendo que el id del carrito es 1 (ajustar según lógica de usuario)
    this.carritoService.obtenerCarrito(1).subscribe({
      next: (carrito: any) => {
        this.cantidadCarrito = carrito.itemsCarrito ? carrito.itemsCarrito.length : 0;
      },
      error: () => {
        this.cantidadCarrito = 0;
      }
    });
  }
}
