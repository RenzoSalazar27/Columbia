import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';

export const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'productos/:categoria', component: ProductosComponent },
  { path: 'productos', redirectTo: '/productos/hombre', pathMatch: 'full' }
];
