
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EntradaProduto {
  idEntradaProduto: number;
  idItem: number;
  dataEntradaProduto: string;
  quantidadeEntrada: number;
  unidade: string;
  valorUnitarioEntrada: number;
  quantidadeEstoque: number;
}

@Injectable({
  providedIn: 'root'
})
export class EntradaProdutoService {
  private apiUrl = 'https://localhost:7299/api/EntradaProduto';

  constructor(private http: HttpClient) {}

  listarEntradas(): Observable<EntradaProduto[]> {
    return this.http.get<EntradaProduto[]>(this.apiUrl);
  }

  consultarEntrada(id: number): Observable<EntradaProduto> {
    return this.http.get<EntradaProduto>(`${this.apiUrl}/${id}`);
  }

  cadastrarEntrada(dados: Partial<EntradaProduto>): Observable<EntradaProduto> {
    return this.http.post<EntradaProduto>(this.apiUrl, dados);
  }

  editarEntrada(id: number, dados: Partial<EntradaProduto>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dados);
  }

  excluirEntrada(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
