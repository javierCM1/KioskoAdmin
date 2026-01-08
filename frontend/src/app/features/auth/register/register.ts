import { Component, inject } from '@angular/core'; // Importamos inject
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})


export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  errorMessage = '';

  // Definimos el formulario directamente como una propiedad
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = 'Error en el registro: ' + error.message;
        }
      });
    }
  }
}
