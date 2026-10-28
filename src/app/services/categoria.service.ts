
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  idcategoria: number;
  categoria: string;
  items?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'https://localhost:7299/api/Categorium';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  consultarCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  cadastrarCategoria(dados: { categoria: string }): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  editarCategoria(id: number, dados: { categoria: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }

  excluirCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
