import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CategoriaService, Categoria } from '../Services/categoria.service';
import { ProductoService, Producto } from '../Services/producto.service';
import { CarritoService } from '../Services/carrito.service';
import { finalize } from 'rxjs';

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
  mensaje: string = '';

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
    private productoService: ProductoService,
    private carritoService: CarritoService
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

  abrirDetalleProducto(producto: Producto) {
    localStorage.setItem('productoDetalle', JSON.stringify(producto));
    this.router.navigate([`/detalle-producto/${producto.idProducto}`]);
  }

  verDetalles(producto: Producto) {
    localStorage.setItem('productoDetalle', JSON.stringify(producto));
    this.router.navigate([`/detalle-producto/${producto.idProducto}`]);
  }

  esFavorito(producto: Producto): boolean {
    const favs = JSON.parse(localStorage.getItem('favoritosProductos') || '[]');
    return favs.some((p: Producto) => p.idProducto === producto.idProducto);
  }

  toggleFavorito(producto: Producto) {
    let favs = JSON.parse(localStorage.getItem('favoritosProductos') || '[]');
    if (favs.some((p: Producto) => p.idProducto === producto.idProducto)) {
      favs = favs.filter((p: Producto) => p.idProducto !== producto.idProducto);
    } else {
      favs.push(producto);
    }
    localStorage.setItem('favoritosProductos', JSON.stringify(favs));
  }

  agregarAlCarrito(producto: Producto) {
    const idCarrito = Number(localStorage.getItem('idCarrito'));
    const usuarioStr = localStorage.getItem('usuario');
    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
    if (!idCarrito) {
      this.mensaje = 'No se encontró un carrito. Intenta recargar la página.';
      setTimeout(() => this.mensaje = '', 2000);
      return;
    }
    this.mensaje = '';
    const item: any = {
      idCarrito: idCarrito,
      idProducto: producto.idProducto,
      cantidadItemCarrito: 1
    };
    if (usuario && usuario.idUsuario) {
      item.idUsuario = usuario.idUsuario;
    }
    let exitoMostrado = false;
    this.carritoService.agregarItem(item)
      .pipe(finalize(() => {
        if (!exitoMostrado && !this.mensaje) {
          this.mensaje = 'Error al agregar al carrito';
          setTimeout(() => this.mensaje = '', 3000);
        }
      }))
      .subscribe({
        next: (res) => {
          exitoMostrado = true;
          this.mensaje = 'Producto agregado al carrito';
          setTimeout(() => this.mensaje = '', 2000);
        },
        error: (error) => {
          if (error.status === 200) {
            this.mensaje = 'Producto agregado al carrito';
            setTimeout(() => this.mensaje = '', 2000);
            exitoMostrado = true;
            return;
          }
          this.mensaje = 'Error al agregar al carrito';
          setTimeout(() => this.mensaje = '', 3000);
        }
      });
  }

  getImagenProducto(producto: any): string {
    if (producto.imagenProducto && producto.imagenProducto.trim() !== '') {
      return producto.imagenProducto;
    }
    if (producto.categoria?.nombreCategoria) {
      switch (producto.categoria.nombreCategoria.toLowerCase()) {
        case 'camisetas':
          return 'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?auto=format&fit=crop&w=500&q=80';
        case 'pantalones':
          return 'https://images.unsplash.com/photo-1719473442938-c605886ba1c3?auto=format&fit=crop&w=500&q=80';
        case 'calzado':
          return 'https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?auto=format&fit=contain&w=500&q=80';
        case 'accesorios':
          return 'https://plus.unsplash.com/premium_photo-1663133604256-a97e956adcc8?auto=format&fit=crop&w=500&q=80';
        case 'shorts':
          return 'https://www.cgs.store/cdn/shop/articles/SHORTS-CUT_SETT.jpg?width=500&height=500&crop=center';
        case 'chalecos':
          return 'https://i.pinimg.com/564x/bd/ac/d1/bdacd15de6de0d7115b5d774289a1a70.jpg';
        // Puedes agregar más categorías aquí
      }
    }
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80';
  }
}
