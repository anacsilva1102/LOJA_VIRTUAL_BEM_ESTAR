
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estoque {
  idItem: number;
  quantidadeEstoque: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = 'https://localhost:7299/api/Estoque';

  constructor(private http: HttpClient) {}

  listarEstoques(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl);
  }
}
