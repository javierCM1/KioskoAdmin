import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  private authService = inject(Auth);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
