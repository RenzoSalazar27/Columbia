import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { FavoritosProductosComponent } from './favoritos-productos/favoritos-productos.component';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'productos/:categoria', component: ProductosComponent },
  { path: 'productos', redirectTo: '/productos/camisetas', pathMatch: 'full' },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'detalle-producto/:id', component: DetalleProductoComponent },
  { path: 'favoritos', component: FavoritosProductosComponent },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.component').then(m => m.CarritoComponent)
  }
];
