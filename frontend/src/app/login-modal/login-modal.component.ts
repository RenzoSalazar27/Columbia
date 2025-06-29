import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  isVisible = false;
  isLoginMode = true; // true para login, false para registro

  showModal() {
    this.isVisible = true;
  }

  hideModal() {
    this.isVisible = false;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // Aquí iría la lógica de autenticación en una implementación real
    console.log('Formulario enviado:', this.isLoginMode ? 'Login' : 'Registro');
    // Simular éxito y cerrar modal
    setTimeout(() => {
      this.hideModal();
    }, 1000);
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.hideModal();
    }
  }
} 