import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7299/api/ProdutoItem';

  constructor(private http: HttpClient) {}

  listarProdutos() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
