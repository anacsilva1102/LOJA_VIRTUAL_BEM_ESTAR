
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemServico {
  idItem: number;
  idCategoria: number;
  item: string;
  descricaoItem: string;
  preco: number;
  tipoItem: string;
  ativoProdutoServico: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemServicoService {
  private apiUrl = 'https://localhost:7299/api/ItemServico';

  constructor(private http: HttpClient) {}

  listarServicos(): Observable<ItemServico[]> {
    return this.http.get<ItemServico[]>(this.apiUrl);
  }

  consultarServico(id: number): Observable<ItemServico> {
    return this.http.get<ItemServico>(`${this.apiUrl}/${id}`);
  }

  cadastrarServico(dados: Partial<ItemServico>): Observable<ItemServico> {
    return this.http.post<ItemServico>(this.apiUrl, dados);
  }

  editarServico(id: number, dados: Partial<ItemServico>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dados);
  }

  excluirServico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
