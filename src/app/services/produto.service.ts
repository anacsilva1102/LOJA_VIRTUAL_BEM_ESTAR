
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  idItem: number;
  idcategoria: number;
  item: string;
  descricaoItem: string;
  precoItem: number;
  tipoItem: string;
  ativoProdutoServico: string;
  codigoPreco: string;
  precoVenda: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7299/api/ProdutoItem';

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  consultarProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  cadastrarProduto(dados: Partial<Produto>): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, dados);
  }

  editarProduto(id: number, dados: Partial<Produto>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dados);
  }

  excluirProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
