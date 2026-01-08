import { Routes } from '@angular/router';
import { Layout} from './shared/components/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { ProductList } from './features/products/product-list/product-list';
import { ProductForm  } from './features/products/product-form/product-form';

export const routes: Routes = [
  // 1. Rutas Públicas (Sin Sidebar)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },

  // 2. Rutas Privadas (Con Layout/Sidebar)
  {
    path: '',
    component: Layout, 
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: ProductList },
      { path: 'products/create', component: ProductForm },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 3. Comodín (Wildcard) - Siempre al final
  {
    path: '**',
    redirectTo: 'login'
  }
];