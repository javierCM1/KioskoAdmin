import { Component, inject, signal, computed } from '@angular/core';
import { ProductService, Product } from '../../../core/services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-sale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-sale.html',
  styleUrl: './new-sale.scss'
})
export class NewSale {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  cart = signal<{product: Product, quantity: number}[]>([]);
  searchTerm = signal('');

  // Filtro reactivo: Se actualiza solo cuando cambia products o searchTerm
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.products().filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.barcode?.includes(term)
    );
  });

  // Total de la venta reactivo
  total = computed(() => {
    return this.cart().reduce((acc, item) => acc + (item.product.sellPrice * item.quantity), 0);
  });

  ngOnInit() {
    this.productService.getProducts().subscribe(prods => this.products.set(prods));
  }

  addToCart(product: Product) {
    if (product.stock <= 0) return alert('Sin stock disponible');

    this.cart.update(currentCart => {
      const existing = currentCart.find(item => item.product.id === product.id);
      if (existing) {
        return currentCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cart.update(current => current.filter(item => item.product.id !== productId));
  }
}
