import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  id?: number;
  barcode?: string;
  name: string;
  stock: number;
  buyPrice: number;
  sellPrice: number;
  category: string;
  imagePath?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products'; 

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(formData: FormData): Observable<any> {
  return this.http.post('/api/products', formData);
}


}