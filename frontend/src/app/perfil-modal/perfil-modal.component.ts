import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-modal.component.html',
  styleUrls: ['./perfil-modal.component.css']
})
export class PerfilModalComponent {
  @Input() usuario: any = null;
  @Output() cerrarModal = new EventEmitter<void>();

  isVisible = false;
  isLoading = false;
  message = '';
  isError = false;

  // Datos del formulario
  formData = {
    nombreUsuario: '',
    apellidoUsuario: '',
    telefonoUsuario: '',
    contrasenaActual: '',
    nuevaContrasena: '',
    confirmarNuevaContrasena: ''
  };

  constructor(private http: HttpClient) {}

  mostrarModal() {
    this.isVisible = true;
    this.cargarDatosUsuario();
  }

  ocultarModal() {
    this.isVisible = false;
    this.resetForm();
  }

  cargarDatosUsuario() {
    if (this.usuario) {
      this.formData = {
        nombreUsuario: this.usuario.nombreUsuario || '',
        apellidoUsuario: this.usuario.apellidoUsuario || '',
        telefonoUsuario: this.usuario.telefonoUsuario || '',
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarNuevaContrasena: ''
      };
    }
  }

  resetForm() {
    this.formData = {
      nombreUsuario: '',
      apellidoUsuario: '',
      telefonoUsuario: '',
      contrasenaActual: '',
      nuevaContrasena: '',
      confirmarNuevaContrasena: ''
    };
    this.message = '';
    this.isError = false;
  }

  guardarCambios() {
    // Validaciones
    const validationError = this.validarFormulario();
    if (validationError) {
      this.message = validationError;
      this.isError = true;
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    // Si se está cambiando la contraseña, validar primero la contraseña actual
    if (this.formData.nuevaContrasena) {
      this.validarContrasenaActual().then((esValida) => {
        if (esValida) {
          this.actualizarPerfil();
        } else {
          this.isLoading = false;
          this.message = 'La contraseña actual es incorrecta';
          this.isError = true;
        }
      }).catch((error) => {
        this.isLoading = false;
        this.message = error.error?.error || 'Error al validar la contraseña';
        this.isError = true;
      });
    } else {
      this.actualizarPerfil();
    }
  }

  validarContrasenaActual(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const requestData = {
        idUsuario: this.usuario.idUsuario,
        contrasenaActual: this.formData.contrasenaActual
      };

      this.http.post('http://localhost:8082/api/usuarios/validar-contrasena', requestData)
        .subscribe({
          next: (response: any) => {
            resolve(response.esValida);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  actualizarPerfil() {
    const datosActualizados: any = {
      nombreUsuario: this.formData.nombreUsuario,
      apellidoUsuario: this.formData.apellidoUsuario,
      telefonoUsuario: this.formData.telefonoUsuario
    };

    // Si se está cambiando la contraseña, agregarla a los datos
    if (this.formData.nuevaContrasena) {
      datosActualizados.contrasenaUsuario = this.formData.nuevaContrasena;
    }

    this.http.put(`http://localhost:8082/api/usuarios/${this.usuario.idUsuario}`, datosActualizados)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.message = 'Perfil actualizado exitosamente';
          this.isError = false;
          
          // Actualizar datos del usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(response));
          
          // Limpiar campos de contraseña
          this.formData.contrasenaActual = '';
          this.formData.nuevaContrasena = '';
          this.formData.confirmarNuevaContrasena = '';
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error.error?.error || 'Error al actualizar el perfil';
          this.isError = true;
        }
      });
  }

  agregarDireccion() {
    // TODO: Implementar funcionalidad de agregar dirección
    this.message = 'Funcionalidad de agregar dirección próximamente disponible';
    this.isError = false;
  }

  validarFormulario(): string | null {
    // Validar nombre
    if (!this.formData.nombreUsuario || this.formData.nombreUsuario.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!this.formData.apellidoUsuario || this.formData.apellidoUsuario.trim().length < 2) {
      return 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar teléfono
    if (!this.formData.telefonoUsuario || this.formData.telefonoUsuario.trim().length < 7) {
      return 'El teléfono debe tener al menos 7 dígitos';
    }

    // Si se está cambiando la contraseña, validar todos los campos de contraseña
    if (this.formData.nuevaContrasena || this.formData.confirmarNuevaContrasena) {
      if (!this.formData.contrasenaActual || this.formData.contrasenaActual.trim().length === 0) {
        return 'Debe ingresar su contraseña actual para cambiarla';
      }

      if (!this.formData.nuevaContrasena || this.formData.nuevaContrasena.trim().length < 6) {
        return 'La nueva contraseña debe tener al menos 6 caracteres';
      }

      if (this.formData.nuevaContrasena !== this.formData.confirmarNuevaContrasena) {
        return 'Las contraseñas no coinciden';
      }
    }

    return null;
  }
} 