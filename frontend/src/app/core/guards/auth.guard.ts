import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth'; // Asegúrate de que la ruta sea correcta

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth); // Inyectamos tu servicio
  const router = inject(Router);

  // Usamos el método que YA definiste en tu clase
  if (authService.isLoggedIn()) {
    return true;
  }

  console.warn('Guard: No hay token válido. Bloqueando acceso.');
  return router.createUrlTree(['/login']);
};
