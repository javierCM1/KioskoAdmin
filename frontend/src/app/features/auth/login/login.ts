import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth} from '../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage: string = '';
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Token recibido:', res.token);
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
   
        this.errorMessage = err.error.message || 'Error de conexión';
      }
    });
    }

  }





