
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://localhost:7299/api/Pedido';

  constructor(private http: HttpClient) {}

  criarPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido);
  }

  listarPedidosPorCliente(idpessoa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente/${idpessoa}`);
  }
}
