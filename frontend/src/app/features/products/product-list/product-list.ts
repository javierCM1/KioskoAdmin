import { Component, inject } from '@angular/core';
import { ProductService, Product } from '../../../core/services/product';
import { CommonModule } from '@angular/common'; // Necesario para el Pipe Async
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // IMPORTANTE: CommonModule para el Pipe Async
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  private productService = inject(ProductService);

  // Definimos el Observable. La convención es usar "$" al final.
  products$: Observable<Product[]> = this.productService.getProducts().pipe(
    map(data => data.map(p => ({
      ...p,
      buyPrice: Number(p.buyPrice),
      sellPrice: Number(p.sellPrice),
      stock: Number(p.stock)
    })))
  );
}