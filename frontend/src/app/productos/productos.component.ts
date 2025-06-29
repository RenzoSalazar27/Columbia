import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';

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

  // Referencia al modal de login
  @ViewChild(LoginModalComponent) modalLogin!: LoginModalComponent;

  // Productos por categoría
  private todosLosProductos: { [key: string]: Producto[] } = {
    'hombre': [
      {
        id: 1,
        nombre: 'Chaqueta Impermeable',
        precio: 'S/ 899.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'hombre',
        descripcion: 'Chaqueta impermeable para actividades outdoor'
      },
      {
        id: 2,
        nombre: 'Pantalón Trekking',
        precio: 'S/ 299.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'hombre',
        descripcion: 'Pantalón cómodo para trekking'
      },
      {
        id: 3,
        nombre: 'Zapatillas Deportivas',
        precio: 'S/ 419.00',
        imagen: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
        categoria: 'hombre',
        descripcion: 'Zapatillas ideales para running'
      },
      {
        id: 4,
        nombre: 'Camiseta Técnica',
        precio: 'S/ 159.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'hombre',
        descripcion: 'Camiseta con tecnología de secado rápido'
      },
      {
        id: 5,
        nombre: 'Gorro Deportivo',
        precio: 'S/ 89.00',
        imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
        categoria: 'hombre',
        descripcion: 'Gorro para proteger del sol'
      },
      {
        id: 6,
        nombre: 'Mochila Outdoor',
        precio: 'S/ 199.00',
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        categoria: 'hombre',
        descripcion: 'Mochila resistente para aventuras'
      }
    ],
    'mujer': [
      {
        id: 7,
        nombre: 'Leggings Deportivos',
        precio: 'S/ 249.00',
        imagen: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
        categoria: 'mujer',
        descripcion: 'Leggings cómodos para yoga y fitness'
      },
      {
        id: 8,
        nombre: 'Top Deportivo',
        precio: 'S/ 179.00',
        imagen: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
        categoria: 'mujer',
        descripcion: 'Top con soporte para actividades deportivas'
      },
      {
        id: 9,
        nombre: 'Chaqueta Ligera',
        precio: 'S/ 399.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'mujer',
        descripcion: 'Chaqueta perfecta para primavera'
      },
      {
        id: 10,
        nombre: 'Zapatillas Running',
        precio: 'S/ 459.00',
        imagen: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
        categoria: 'mujer',
        descripcion: 'Zapatillas especializadas para running'
      },
      {
        id: 11,
        nombre: 'Shorts Deportivos',
        precio: 'S/ 129.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'mujer',
        descripcion: 'Shorts cómodos para entrenamiento'
      },
      {
        id: 12,
        nombre: 'Mochila Deportiva',
        precio: 'S/ 179.00',
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        categoria: 'mujer',
        descripcion: 'Mochila elegante para el gimnasio'
      }
    ],
    'ninos': [
      {
        id: 13,
        nombre: 'Chaqueta Infantil',
        precio: 'S/ 199.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'ninos',
        descripcion: 'Chaqueta resistente para niños'
      },
      {
        id: 14,
        nombre: 'Pantalón Infantil',
        precio: 'S/ 149.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'ninos',
        descripcion: 'Pantalón cómodo para niños activos'
      },
      {
        id: 15,
        nombre: 'Zapatillas Infantiles',
        precio: 'S/ 229.00',
        imagen: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
        categoria: 'ninos',
        descripcion: 'Zapatillas duraderas para niños'
      },
      {
        id: 16,
        nombre: 'Camiseta Infantil',
        precio: 'S/ 89.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'ninos',
        descripcion: 'Camiseta divertida para niños'
      },
      {
        id: 17,
        nombre: 'Gorro Infantil',
        precio: 'S/ 59.00',
        imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
        categoria: 'ninos',
        descripcion: 'Gorro colorido para niños'
      },
      {
        id: 18,
        nombre: 'Mochila Infantil',
        precio: 'S/ 119.00',
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        categoria: 'ninos',
        descripcion: 'Mochila pequeña para niños'
      }
    ],
    'accesorios': [
      {
        id: 19,
        nombre: 'Mochila Trekking',
        precio: 'S/ 299.00',
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Mochila resistente para aventuras'
      },
      {
        id: 20,
        nombre: 'Botella de Agua',
        precio: 'S/ 79.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Botella reutilizable de 1L'
      },
      {
        id: 21,
        nombre: 'Gafas de Sol',
        precio: 'S/ 159.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Gafas con protección UV'
      },
      {
        id: 22,
        nombre: 'Gorra Deportiva',
        precio: 'S/ 89.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Gorra ajustable para deportes'
      },
      {
        id: 23,
        nombre: 'Cinturón Deportivo',
        precio: 'S/ 129.00',
        imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Cinturón para cargar peso'
      },
      {
        id: 24,
        nombre: 'Linterna LED',
        precio: 'S/ 99.00',
        imagen: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
        categoria: 'accesorios',
        descripcion: 'Linterna potente para camping'
      }
    ],
    'calzado': [
      {
        id: 25,
        nombre: 'Zapatillas Trekking',
        precio: 'S/ 419.00',
        imagen: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
        categoria: 'calzado',
        descripcion: 'Zapatillas especializadas para trekking'
      },
      {
        id: 26,
        nombre: 'Botas de Montaña',
        precio: 'S/ 599.00',
        imagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        categoria: 'calzado',
        descripcion: 'Botas resistentes para montañismo'
      },
      {
        id: 27,
        nombre: 'Zapatillas Running',
        precio: 'S/ 379.00',
        imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        categoria: 'calzado',
        descripcion: 'Zapatillas ligeras para running'
      },
      {
        id: 28,
        nombre: 'Sandalias Deportivas',
        precio: 'S/ 199.00',
        imagen: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
        categoria: 'calzado',
        descripcion: 'Sandalias cómodas para verano'
      },
      {
        id: 29,
        nombre: 'Zapatillas Casual',
        precio: 'S/ 289.00',
        imagen: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
        categoria: 'calzado',
        descripcion: 'Zapatillas casuales para el día a día'
      },
      {
        id: 30,
        nombre: 'Botas de Agua',
        precio: 'S/ 349.00',
        imagen: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        categoria: 'calzado',
        descripcion: 'Botas impermeables para lluvia'
      }
    ]
  };

  constructor(private ruta: ActivatedRoute, private router: Router) {}

  ngOnInit() {
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

  private iniciarCarrusel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    const mostrarSlide = (index: number) => {
      // Ocultar todas las slides
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));

      // Mostrar la slide actual
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
    };

    const siguienteSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      mostrarSlide(currentSlide);
    };

    // Cambiar slide cada 7 segundos
    setInterval(siguienteSlide, 7000);

    // Permitir clic en los indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        mostrarSlide(currentSlide);
      });
    });
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
    const informacionCategoria: { [key: string]: { titulo: string; descripcion: string } } = {
      'hombre': {
        titulo: 'Ropa y Accesorios para Hombre',
        descripcion: 'Descubre nuestra colección completa de ropa deportiva y accesorios diseñados especialmente para hombres activos.'
      },
      'mujer': {
        titulo: 'Ropa y Accesorios para Mujer',
        descripcion: 'Explora nuestra línea de ropa deportiva y accesorios creados para mujeres que aman el deporte y la aventura.'
      },
      'ninos': {
        titulo: 'Ropa y Accesorios para Niños',
        descripcion: 'Encuentra ropa cómoda y divertida para los más pequeños de la casa, perfecta para sus actividades favoritas.'
      },
      'accesorios': {
        titulo: 'Accesorios Deportivos',
        descripcion: 'Completa tu equipo con nuestros accesorios de alta calidad para todas tus actividades deportivas y outdoor.'
      },
      'calzado': {
        titulo: 'Calzado Deportivo',
        descripcion: 'Descubre nuestra colección de calzado especializado para diferentes deportes y actividades outdoor.'
      }
    };

    const info = informacionCategoria[this.categoria];
    this.tituloCategoria = info?.titulo || 'Productos';
    this.descripcionCategoria = info?.descripcion || 'Explora nuestra colección de productos.';
  }
}
