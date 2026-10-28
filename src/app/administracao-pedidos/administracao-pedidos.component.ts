import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-administracao-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './administracao-pedidos.component.html',
  styleUrl: './administracao-pedidos.component.css'
})
export class AdministracaoPedidosComponent implements OnInit {
  pedidos: any[] = [];
  mensagem = '';
  carregando = false;

  private apiUrl = 'https://localhost:7299/api/Pedido';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos(): void {
    this.carregando = true;
    this.mensagem = '';

    this.http.get<any[]>(this.apiUrl + '/cliente/29').subscribe({
      next: resposta => {
        this.pedidos = resposta;
        this.carregando = false;
      },
      error: erro => {
        console.error('Erro ao listar pedidos:', erro);
        this.mensagem = 'Não foi possível carregar os pedidos.';
        this.carregando = false;
      }
    });
  }
}
