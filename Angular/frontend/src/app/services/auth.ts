
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      senha
    });
  }

  cadastrar(dados: any) {
    return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

}
