import { Component, inject, signal } from '@angular/core'; // Usamos signals
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  // Angular 19: Usamos signals para el estado de la UI
  selectedFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  productForm = this.fb.group({
    barcode: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    buyPrice: ['', [Validators.required, Validators.min(0)]],
    sellPrice: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    category: [''] ,
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const formData = new FormData();
  const rawValue = this.productForm.getRawValue();

  // Mapeo limpio con lógica de defecto
  Object.keys(rawValue).forEach(key => {
    let value = (rawValue as any)[key];

    // LÍNEA CLAVE: Si la llave es category y está vacía, ponemos el valor por defecto
    if (key === 'category' && !value) {
      value = 'Sin Categoría';
    }

    if (value !== null && value !== '') {
      formData.append(key, value);
    }
  });

    if (this.selectedFile()) {
      formData.append('image', this.selectedFile()!);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => {
        console.error('Detalle del error:', err);
        // Si el backend falla, mostramos el mensaje real o el status
        const msg = err.error?.message || err.statusText || 'Error en la conexión';
        alert(`Error: ${msg}`);
      }
    });
  }

  removeImage() {
    this.selectedFile.set(null);
    this.imagePreview.set(null);
  }
}
