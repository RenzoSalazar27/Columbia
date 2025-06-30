import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, LoginModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Columbia Perú';

  // Referencia al modal de login usando ViewChild
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;

  // Estado de autenticación
  isLoggedIn = false;
  currentUser: any = null;

  ngOnInit() {
    // Verificar si hay un usuario logueado al cargar la página
    this.checkAuthStatus();
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

  // Método para abrir el modal de login
  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.showModal();
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
    } else {
      this.logout();
    }
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('usuario');
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}
