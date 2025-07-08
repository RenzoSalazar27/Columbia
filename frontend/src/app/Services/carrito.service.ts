import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiCarrito = 'http://localhost:8082/api/carritos';
  private apiItems = 'http://localhost:8082/api/items-carrito';

  constructor(private http: HttpClient) {}

  obtenerCarrito(idCarrito: number): Observable<any> {
    return this.http.get(`${this.apiCarrito}/${idCarrito}`);
  }

  agregarItem(item: { idCarrito: number, idProducto: number, cantidadItemCarrito: number }): Observable<any> {
    return this.http.post(this.apiItems, item);
  }

  eliminarItem(idItem: number): Observable<any> {
    return this.http.delete(`${this.apiItems}/${idItem}`);
  }

  vaciarCarrito(idCarrito: number): Observable<any> {
    return this.http.delete(`${this.apiCarrito}/${idCarrito}`);
  }
} 