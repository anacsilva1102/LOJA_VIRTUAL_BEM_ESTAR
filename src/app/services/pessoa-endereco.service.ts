import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaEnderecoService {
  private apiUrl = 'https://localhost:7299/api/PessoaEndereco';

  constructor(private http: HttpClient) {}

  cadastrarPessoa(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  listarPessoas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  consultarPessoaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}