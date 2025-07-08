import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CategoriaService, Categoria } from '../categoria.service';

interface Producto {
  id: number;
  nombre: string;
  precio: string;
  imagen: string;
  categoria: string;
  descripcion: string;
}

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

  // Productos por categoría (mantenemos algunos productos de ejemplo)
  private todosLosProductos: { [key: string]: Producto[] } = {
    'camisetas': [
      {
        id: 1,
        nombre: 'Camiseta Deportiva',
        precio: 'S/ 89.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'camisetas',
        descripcion: 'Camiseta cómoda para actividades deportivas'
      },
      {
        id: 2,
        nombre: 'Camiseta Técnica',
        precio: 'S/ 159.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'camisetas',
        descripcion: 'Camiseta con tecnología de secado rápido'
      }
    ],
    'chalecos': [
      {
        id: 7,
        nombre: 'Chaleco Deportivo',
        precio: 'S/ 199.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'chalecos',
        descripcion: 'Chaleco ligero para actividades outdoor'
      },
      {
        id: 8,
        nombre: 'Chaleco de Seguridad',
        precio: 'S/ 89.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'chalecos',
        descripcion: 'Chaleco reflectivo para seguridad'
      }
    ],
    'pantalones': [
      {
        id: 13,
        nombre: 'Pantalón Deportivo',
        precio: 'S/ 199.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'pantalones',
        descripcion: 'Pantalón cómodo para deportes'
      },
      {
        id: 14,
        nombre: 'Pantalón Casual',
        precio: 'S/ 159.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'pantalones',
        descripcion: 'Pantalón casual para uso diario'
      }
    ],
    'shorts': [
      {
        id: 19,
        nombre: 'Shorts Deportivos',
        precio: 'S/ 129.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'shorts',
        descripcion: 'Shorts cómodos para entrenamiento'
      },
      {
        id: 20,
        nombre: 'Shorts Casual',
        precio: 'S/ 89.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'shorts',
        descripcion: 'Shorts casuales para el día a día'
      }
    ],
    'accesorios': [
      {
        id: 25,
        nombre: 'Mochila Deportiva',
        precio: 'S/ 199.00',
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Mochila resistente para deportes'
      },
      {
        id: 26,
        nombre: 'Botella de Agua',
        precio: 'S/ 79.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Botella reutilizable de 1L'
      }
    ]
  };

  constructor(
    private ruta: ActivatedRoute, 
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    // Cargar categorías dinámicamente
    this.cargarCategorias();
    
    this.ruta.params.subscribe(parametros => {
      this.categoria = parametros['categoria'] || '';
      this.esHome = !this.categoria || this.router.url === '/';
      
      if (this.esHome) {
        // Si es home, no cargar productos
        this.productos = [];
        this.tituloCategoria = '';
        this.descripcionCategoria = '';
      } else {
        this.cargarProductos();
        this.establecerInformacionCategoria();
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

  cargarProductos() {
    this.productos = this.todosLosProductos[this.categoria] || [];
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
