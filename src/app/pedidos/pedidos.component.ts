import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PedidoService } from '../services/pedido.service';

interface ItemPedido {
  idItem: number;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

interface Pedido {
  idPedido: number;
  idPessoa: number;
  dataPedido: string;
  status: string;
  formaPagamento: string;
  frete: number;
  total: number;
  itens: ItemPedido[];
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  carregando = false;
  mensagem = '';
  erro = '';

  statusPermitidos = [
    'Aberto',
    'Em processamento',
    'Concluído',
    'Cancelado'
  ];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos(): void {
    this.carregando = true;
    this.erro = '';

    this.pedidoService.listarTodosPedidos().subscribe({
      next: (dados) => {
        this.pedidos = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os pedidos.';
        this.carregando = false;
      }
    });
  }

  atualizarStatus(pedido: Pedido, novoStatus: string): void {
    this.mensagem = '';
    this.erro = '';

    if (!novoStatus || novoStatus === pedido.status) {
      return;
    }

    this.pedidoService.atualizarStatusPedido(
      pedido.idPedido,
      novoStatus
    ).subscribe({
      next: (resposta) => {
        pedido.status = resposta.status;
        this.mensagem = `Status do pedido ${pedido.idPedido} atualizado com sucesso!`;
      },
      error: (erro) => {
        this.erro = erro.error?.mensagem ||
          'Não foi possível atualizar o status do pedido.';
      }
    });
  }
}
