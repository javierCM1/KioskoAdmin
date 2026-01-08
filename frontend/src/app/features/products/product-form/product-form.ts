import { Component,inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { Router ,RouterModule} from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  selectedFile: File | null = null; // Para guardar el archivo físicamente
  imagePreview: string | null = null; // Para mostrar la miniatura antes de subir

  productForm = this.fb.group({
    barcode: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    buyPrice: ['', [Validators.required, Validators.min(0)]],
    sellPrice: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    category: [''],
  });

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Generar una previsualización para el usuario
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    // ESTRATEGIA: Usamos FormData para enviar el archivo + los textos
    const formData = new FormData();
    const rawValue = this.productForm.getRawValue();

    formData.append('name', rawValue.name!);
    formData.append('buyPrice', String(rawValue.buyPrice));
    formData.append('sellPrice', String(rawValue.sellPrice));
    formData.append('stock', String(rawValue.stock));
    formData.append('category', rawValue.category || 'Sin Categoría');
    if (rawValue.barcode) formData.append('barcode', rawValue.barcode);
    
    // Si hay un archivo seleccionado, lo adjuntamos
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // El servicio ahora debe recibir el FormData
    this.productService.createProduct(formData).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => alert(err.error.message)
    });
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
  }


}
