import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CategoriaService, Categoria } from '../categoria.service';
import { ProductoService, Producto } from '../producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginModalComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit, AfterViewInit {
  categoria: string = '';
  productos: Producto[] = [];
  tituloCategoria: string = '';
  descripcionCategoria: string = '';
  esHome: boolean = false;

  // Categorías dinámicas
  categorias: Categoria[] = [];
  categoriasCargadas = false;
  errorCargarCategorias = false;

  // Referencia al modal de login
  @ViewChild(LoginModalComponent) modalLogin!: LoginModalComponent;

  // Productos cargados dinámicamente
  productosCargados = false;
  errorCargarProductos = false;

  constructor(
    private ruta: ActivatedRoute, 
    private router: Router,
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.ruta.params.subscribe(parametros => {
      this.categoria = parametros['categoria'] || '';
      this.esHome = !this.categoria || this.router.url === '/';
      if (this.esHome) {
        this.cargarProductosDestacados();
        this.tituloCategoria = '';
        this.descripcionCategoria = '';
      } else {
        // Esperar a que las categorías estén cargadas antes de cargar productos
        const intentarCargarProductos = () => {
          if (this.categoriasCargadas) {
            this.cargarProductos();
            this.establecerInformacionCategoria();
          } else {
            setTimeout(intentarCargarProductos, 50);
          }
        };
        intentarCargarProductos();
      }
    });
  }

  ngAfterViewInit() {
    // Inicializar el carrusel automático
    this.iniciarCarrusel();
  }

  // Cargar categorías desde el backend
  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
        this.categoriasCargadas = true;
        this.errorCargarCategorias = false;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
        this.categoriasCargadas = true;
        this.errorCargarCategorias = true;
        this.categorias = [];
      }
    });
  }

  private iniciarCarrusel() {
    // Verificar que estamos en el home antes de inicializar el carrusel
    if (!this.esHome) {
      return;
    }

    // Esperar un poco para que el DOM se renderice
    setTimeout(() => {
      const slides = document.querySelectorAll('.carousel-slide');
      const indicators = document.querySelectorAll('.indicator');
      
      // Verificar que existen los elementos necesarios
      if (slides.length === 0 || indicators.length === 0) {
        console.log('Carrusel no encontrado, saltando inicialización');
        return;
      }

      let currentSlide = 0;

      const mostrarSlide = (index: number) => {
        // Verificar que los elementos existen antes de acceder
        if (slides[index] && indicators[index]) {
          // Ocultar todas las slides
          slides.forEach(slide => {
            if (slide) slide.classList.remove('active');
          });
          indicators.forEach(indicator => {
            if (indicator) indicator.classList.remove('active');
          });

          // Mostrar la slide actual
          slides[index].classList.add('active');
          indicators[index].classList.add('active');
        }
      };

      const siguienteSlide = () => {
        if (slides.length > 0) {
          currentSlide = (currentSlide + 1) % slides.length;
          mostrarSlide(currentSlide);
        }
      };

      // Cambiar slide cada 7 segundos solo si hay slides
      if (slides.length > 1) {
        setInterval(siguienteSlide, 7000);
      }

      // Permitir clic en los indicadores
      indicators.forEach((indicator, index) => {
        if (indicator) {
          indicator.addEventListener('click', () => {
            currentSlide = index;
            mostrarSlide(currentSlide);
          });
        }
      });
    }, 100); // Pequeño delay para asegurar que el DOM esté listo
  }

  // Método para abrir el modal de login
  abrirModalLogin() {
    if (this.modalLogin) {
      this.modalLogin.showModal();
    }
  }

  cargarProductosDestacados() {
    this.productosCargados = false;
    this.errorCargarProductos = false;
    
    // Cargar todos los productos y mostrar los primeros 6 como destacados
    this.productoService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.productos = productos.slice(0, 6); // Mostrar solo los primeros 6 productos
        this.productosCargados = true;
        this.errorCargarProductos = false;
      },
      error: (error: any) => {
        console.error('Error al cargar productos destacados:', error);
        this.productos = [];
        this.productosCargados = true;
        this.errorCargarProductos = true;
      }
    });
  }

  cargarProductos() {
    this.productosCargados = false;
    this.errorCargarProductos = false;
    
    // Buscar la categoría por nombre
    const categoriaEncontrada = this.categorias.find(cat => 
      this.getNombreCategoriaParaUrl(cat.nombreCategoria) === this.categoria
    );
    
    if (categoriaEncontrada) {
      this.productoService.getProductosPorCategoria(categoriaEncontrada.idCategoria).subscribe({
        next: (productos: Producto[]) => {
          this.productos = productos;
          this.productosCargados = true;
          this.errorCargarProductos = false;
        },
        error: (error: any) => {
          console.error('Error al cargar productos:', error);
          this.productos = [];
          this.productosCargados = true;
          this.errorCargarProductos = true;
        }
      });
    } else {
      this.productos = [];
      this.productosCargados = true;
      this.errorCargarProductos = true;
    }
  }

  establecerInformacionCategoria() {
    // Buscar la categoría en la lista dinámica
    const categoriaEncontrada = this.categorias.find(cat => 
      this.getNombreCategoriaParaUrl(cat.nombreCategoria) === this.categoria
    );

    if (categoriaEncontrada) {
      this.tituloCategoria = categoriaEncontrada.nombreCategoria;
      this.descripcionCategoria = categoriaEncontrada.descripcionCategoria;
    } else {
      // Fallback si no se encuentra la categoría
      this.tituloCategoria = 'Productos';
      this.descripcionCategoria = 'Explora nuestra colección de productos.';
    }
  }

  // Obtener el nombre de la categoría para la URL
  getNombreCategoriaParaUrl(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-');
  }

  // Obtener icono para la categoría
  getIconoCategoria(nombre: string): string {
    switch (nombre.toLowerCase()) {
      case 'camisetas': return '👕';
      case 'chalecos': return '🦺';
      case 'pantalones': return '👖';
      case 'shorts': return '🩳';
      case 'accesorios': return '🎒';
      default: return '🏷️';
    }
  }
}
