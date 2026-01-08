import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product';

@Component({
  selector: 'app-dashboard',
  imports: [],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private productService = inject(ProductService);
  totalProducts = 0;

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.totalProducts = products.length;
    });
  }
}
