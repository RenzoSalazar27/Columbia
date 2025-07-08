import { Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'productos/:categoria', component: ProductosComponent },
  { path: 'productos', redirectTo: '/productos/camisetas', pathMatch: 'full' },
  { path: 'admin', component: AdminPanelComponent }
];
