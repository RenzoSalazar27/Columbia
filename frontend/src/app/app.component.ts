import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  title = 'Columbia Perú';

  // Referencia al modal de login usando ViewChild
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;

  ngAfterViewInit() {
    // El modal estará disponible después de que se inicialice la vista
  }

  // Método para abrir el modal de login
  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.showModal();
    }
  }
}
