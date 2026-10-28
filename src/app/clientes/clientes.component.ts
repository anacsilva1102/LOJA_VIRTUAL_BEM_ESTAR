import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PessoaEnderecoService } from '../services/pessoa-endereco.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  idBusca = '';
  mensagem = '';
  carregando = false;

  constructor(private pessoaEnderecoService: PessoaEnderecoService) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.carregando = true;
    this.mensagem = '';

    this.pessoaEnderecoService.listarPessoas().subscribe({
      next: resposta => {
        this.clientes = resposta;
        this.carregando = false;
      },
      error: erro => {
        console.error('Erro ao listar clientes:', erro);
        this.mensagem = 'Não foi possível carregar os clientes.';
        this.carregando = false;
      }
    });
  }

  consultarPorId(): void {
    const id = Number(this.idBusca);

    if (!Number.isInteger(id) || id <= 0) {
      this.mensagem = 'Informe um ID válido.';
      return;
    }

    this.carregando = true;
    this.mensagem = '';

    this.pessoaEnderecoService.consultarPessoaPorId(id).subscribe({
      next: cliente => {
        this.clientes = [cliente];
        this.carregando = false;
        this.mensagem = '';
      },
      error: erro => {
        console.error('Erro ao consultar cliente:', erro);
        this.clientes = [];
        this.mensagem = erro.status === 404
          ? 'Cliente não encontrado.'
          : 'Não foi possível consultar o cliente.';
        this.carregando = false;
      }
    });
  }

  limparBusca(): void {
    this.idBusca = '';
    this.listarClientes();
  }
}