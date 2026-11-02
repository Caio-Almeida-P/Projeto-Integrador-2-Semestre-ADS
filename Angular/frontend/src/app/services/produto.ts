import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  listarProdutos() {
    return this.http.get(this.apiUrl);
  }

  buscarProdutoPorId(id: string) {
  return this.http.get(`${this.apiUrl}/${id}`);
  }
}