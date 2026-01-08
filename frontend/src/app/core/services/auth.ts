import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) {}
  

register(userData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/register`, userData);
}

login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap(res => {
        // El "tap" permite ejecutar efectos secundarios sin alterar el flujo de datos
        if (res.token) {
          localStorage.setItem('kiosk_token', res.token);
        }
      })
    );
  }

getToken(): string | null {
    return localStorage.getItem('kiosk_token');
  }

 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  
  logout(): void {
    localStorage.removeItem('kiosk_token');
  }


}
