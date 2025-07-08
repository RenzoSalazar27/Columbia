import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../Services/carrito.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Output() authStatusChanged = new EventEmitter<any>();

  isVisible = false;
  isLoginMode = true; // true para login, false para registro
  mostrarRestablecerContrasena = false;

  // Datos del formulario
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  };

  restablecerData = {
    email: '',
    nuevaContrasena: '',
    confirmarNuevaContrasena: ''
  };

  // Estado de carga y mensajes
  isLoading = false;
  message = '';
  isError = false;

  constructor(private http: HttpClient, private carritoService: CarritoService) {}

  showModal() {
    this.isVisible = true;
    this.resetForm();
  }

  hideModal() {
    this.isVisible = false;
    this.resetForm();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForm();
  }

  mostrarFormularioRestablecer() {
    this.mostrarRestablecerContrasena = true;
    this.resetForm();
  }

  mostrarFormularioLogin() {
    this.mostrarRestablecerContrasena = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      password: '',
      confirmPassword: ''
    };
    this.restablecerData = {
      email: '',
      nuevaContrasena: '',
      confirmarNuevaContrasena: ''
    };
    this.message = '';
    this.isError = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    this.isLoading = true;
    this.message = '';
    this.isError = false;

    if (this.isLoginMode) {
      this.login();
    } else {
      this.registro();
    }
  }

  login() {
    // Validaciones del frontend
    const validationError = this.validarLogin();
    if (validationError) {
      this.isLoading = false;
      this.message = validationError;
      this.isError = true;
      return;
    }

    const loginData = {
      emailUsuario: this.formData.email,
      contrasenaUsuario: this.formData.password
    };

    this.http.post('http://localhost:8082/api/usuarios/login', loginData)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          
          // Verificar que la respuesta contiene el usuario
          if (response && response.usuario) {
            // Guardar datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            
            // Obtener el carrito del usuario y guardar el idCarrito
            this.carritoService.obtenerCarritoPorUsuario(response.usuario.idUsuario).subscribe({
              next: (carrito: any) => {
                if (carrito && carrito.idCarrito) {
                  localStorage.setItem('idCarrito', carrito.idCarrito.toString());
                  this.authStatusChanged.emit(response.usuario);
                  this.hideModal();
                } else {
                  // Si no hay carrito, crearlo
                  this.carritoService.crearCarrito(response.usuario.idUsuario).subscribe({
                    next: (nuevoCarrito: any) => {
                      if (nuevoCarrito && nuevoCarrito.idCarrito) {
                        localStorage.setItem('idCarrito', nuevoCarrito.idCarrito.toString());
                      }
                      this.authStatusChanged.emit(response.usuario);
                      this.hideModal();
                    },
                    error: () => {
                      localStorage.removeItem('idCarrito');
                      this.authStatusChanged.emit(response.usuario);
                      this.hideModal();
                    }
                  });
                }
              },
              error: () => {
                // Si no hay carrito, crearlo
                this.carritoService.crearCarrito(response.usuario.idUsuario).subscribe({
                  next: (nuevoCarrito: any) => {
                    if (nuevoCarrito && nuevoCarrito.idCarrito) {
                      localStorage.setItem('idCarrito', nuevoCarrito.idCarrito.toString());
                    }
                    this.authStatusChanged.emit(response.usuario);
                    this.hideModal();
                  },
                  error: () => {
                    localStorage.removeItem('idCarrito');
                    this.authStatusChanged.emit(response.usuario);
                    this.hideModal();
                  }
                });
              }
            });
          } else {
            this.message = 'Respuesta inválida del servidor';
            this.isError = true;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error de login:', error);
          
          if (error.status === 0) {
            this.message = 'No se puede conectar al servidor. Verifica que el backend esté ejecutándose.';
          } else if (error.error && error.error.error) {
            this.message = error.error.error;
          } else if (error.status === 404) {
            this.message = 'Endpoint no encontrado. Verifica la URL del backend.';
          } else if (error.status === 500) {
            this.message = 'Error interno del servidor.';
          } else {
            this.message = 'Error en el inicio de sesión. Intenta de nuevo.';
          }
          this.isError = true;
        }
      });
  }

  registro() {
    // Validaciones del frontend
    const validationError = this.validarRegistro();
    if (validationError) {
      this.isLoading = false;
      this.message = validationError;
      this.isError = true;
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.formData.password !== this.formData.confirmPassword) {
      this.isLoading = false;
      this.message = 'Las contraseñas no coinciden';
      this.isError = true;
      return;
    }

    const registroData = {
      nombreUsuario: this.formData.firstName,
      apellidoUsuario: this.formData.lastName,
      emailUsuario: this.formData.email,
      telefonoUsuario: this.formData.phone,
      fechaNacimientoUsuario: this.formData.birthDate,
      contrasenaUsuario: this.formData.password
    };

    this.http.post('http://localhost:8082/api/usuarios/registro', registroData)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          
          // Verificar que la respuesta contiene el usuario
          if (response && response.usuario) {
            // Guardar datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            
            // Emitir evento de cambio de estado
            this.authStatusChanged.emit(response.usuario);
            
            // Cerrar modal inmediatamente
            this.hideModal();
          } else {
            this.message = 'Respuesta inválida del servidor';
            this.isError = true;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error de registro:', error);
          
          if (error.status === 0) {
            this.message = 'No se puede conectar al servidor. Verifica que el backend esté ejecutándose.';
          } else if (error.error && error.error.error) {
            this.message = error.error.error;
          } else if (error.status === 404) {
            this.message = 'Endpoint no encontrado. Verifica la URL del backend.';
          } else if (error.status === 500) {
            this.message = 'Error interno del servidor.';
          } else {
            this.message = 'Error en el registro. Intenta de nuevo.';
          }
          this.isError = true;
        }
      });
  }

  restablecerContrasena() {
    // Validaciones del frontend
    const validationError = this.validarRestablecer();
    if (validationError) {
      this.isLoading = false;
      this.message = validationError;
      this.isError = true;
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    const restablecerData = {
      email: this.restablecerData.email,
      nuevaContrasena: this.restablecerData.nuevaContrasena
    };

    this.http.post('http://localhost:8082/api/usuarios/restablecer-contrasena', restablecerData)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.message = 'Contraseña restablecida exitosamente';
          this.isError = false;
          
          // Limpiar formulario de restablecer
          this.restablecerData = {
            email: '',
            nuevaContrasena: '',
            confirmarNuevaContrasena: ''
          };
          
          // Volver al formulario de login después de un delay
          setTimeout(() => {
            this.mostrarFormularioLogin();
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error.error?.error || 'Error al restablecer la contraseña';
          this.isError = true;
        }
      });
  }

  // Validaciones para registro
  validarRegistro(): string | null {
    // Validar nombre
    if (!this.formData.firstName || this.formData.firstName.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!this.formData.lastName || this.formData.lastName.trim().length < 2) {
      return 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar email
    if (!this.formData.email || !this.validarEmail(this.formData.email)) {
      return 'Ingrese un email válido';
    }

    // Validar teléfono
    if (!this.formData.phone || this.formData.phone.trim().length < 8) {
      return 'El teléfono debe tener al menos 8 dígitos';
    }

    // Validar fecha de nacimiento
    if (!this.formData.birthDate) {
      return 'Seleccione su fecha de nacimiento';
    }

    // Validar que la fecha no sea futura
    const fechaNacimiento = new Date(this.formData.birthDate);
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      return 'La fecha de nacimiento no puede ser futura';
    }

    // Validar edad mínima (13 años)
    const edadMinima = new Date();
    edadMinima.setFullYear(edadMinima.getFullYear() - 13);
    if (fechaNacimiento > edadMinima) {
      return 'Debe tener al menos 13 años para registrarse';
    }

    // Validar contraseña
    if (!this.formData.password || this.formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    if (!this.formData.confirmPassword) {
      return 'Confirme su contraseña';
    }

    return null;
  }

  // Validaciones para login
  validarLogin(): string | null {
    // Validar email
    if (!this.formData.email || !this.validarEmail(this.formData.email)) {
      return 'Ingrese un email válido';
    }

    // Validar contraseña
    if (!this.formData.password || this.formData.password.length < 1) {
      return 'Ingrese su contraseña';
    }

    return null;
  }

  // Validaciones para restablecer contraseña
  validarRestablecer(): string | null {
    // Validar email
    if (!this.restablecerData.email || !this.validarEmail(this.restablecerData.email)) {
      return 'Ingrese un email válido';
    }

    // Validar nueva contraseña
    if (!this.restablecerData.nuevaContrasena || this.restablecerData.nuevaContrasena.length < 6) {
      return 'La nueva contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    if (this.restablecerData.nuevaContrasena !== this.restablecerData.confirmarNuevaContrasena) {
      return 'Las contraseñas no coinciden';
    }

    return null;
  }

  // Validar formato de email
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
} 