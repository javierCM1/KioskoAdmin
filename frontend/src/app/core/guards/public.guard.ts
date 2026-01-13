import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth'; // Asegúrate de que la ruta sea correcta

export const publicGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Verificamos si ya existe una sesión activa
  if (authService.isLoggedIn()) {
    console.log('Public Guard: Usuario ya autenticado, redirigiendo al Dashboard...');

    // Si ya está logueado, lo mandamos al dashboard
    // Usamos createUrlTree para una redirección limpia en Guards
    return router.createUrlTree(['/dashboard']);
  }

  // Si no está logueado, permitimos que vea el Login/Register (true)
  return true;
};
