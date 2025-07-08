import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  idUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  emailUsuario: string;
  direccionUsuario: string;
  telefonoUsuario: string;
  fechaNacimientoUsuario: string;
  fechaRegistroUsuario: string;
  esAdminUsuario: boolean;
}

export interface CantidadClientes {
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8082/api/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes (no administradores)
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  // Obtener cantidad de clientes
  getCantidadClientes(): Observable<CantidadClientes> {
    return this.http.get<CantidadClientes>(`${this.apiUrl}/clientes/cantidad`);
  }

  // Obtener cliente por ID
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // Actualizar cliente
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clientes/${id}`, cliente);
  }

  // Eliminar cliente
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);
  }
} 