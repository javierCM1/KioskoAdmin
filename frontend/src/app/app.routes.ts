import { Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard'; // El que evita ir al login si ya estás logueado

export const routes: Routes = [
  // 1. Rutas Públicas
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },

  // 2. Rutas Privadas PROTEGIDAS
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductList)
      },
      {
        path: 'products/create',
        loadComponent: () => import('./features/products/product-form/product-form').then(m => m.ProductForm)
      },
      {
        path: 'sales/new',
        loadComponent: () => import('./features/sales/new-sale/new-sale').then(m => m.NewSale)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
