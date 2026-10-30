import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EntradaProduto, EntradaProdutoService } from '../services/entrada-produto.service';

@Component({
  selector: 'app-entrada-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './entrada-produtos.component.html',
  styleUrl: './entrada-produtos.component.css'
})
export class EntradaProdutosComponent implements OnInit {
  entradas: EntradaProduto[] = [];

  idItem: number | null = null;
  dataEntradaProduto = '';
  quantidadeEntrada: number | null = null;
  unidade = '';
  valorUnitarioEntrada: number | null = null;

  idBusca: number | null = null;
  idEdicao: number | null = null;

  mensagem = '';
  erro = '';
  carregando = false;

  constructor(private entradaProdutoService: EntradaProdutoService) {}

  ngOnInit(): void {
    this.listarEntradas();
  }

  listarEntradas(): void {
    this.carregando = true;

    this.entradaProdutoService.listarEntradas().subscribe({
      next: (dados) => {
        this.entradas = dados;
        this.carregando = false;
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Não foi possível carregar as entradas de produtos.';
        this.carregando = false;
      }
    });
  }

  salvarEntrada(): void {
    this.mensagem = '';
    this.erro = '';

    if (
      this.idItem === null ||
      !this.dataEntradaProduto ||
      this.quantidadeEntrada === null ||
      !this.unidade.trim() ||
      this.valorUnitarioEntrada === null
    ) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    if (
      this.idItem <= 0 ||
      this.quantidadeEntrada <= 0 ||
      this.valorUnitarioEntrada <= 0 ||
      this.unidade.trim().length > 10
    ) {
      this.erro = 'Confira os valores informados. A unidade deve ter até 10 caracteres.';
      return;
    }

    const dados: Partial<EntradaProduto> = {
      idItem: this.idItem,
      dataEntradaProduto: this.dataEntradaProduto,
      quantidadeEntrada: this.quantidadeEntrada,
      unidade: this.unidade.trim(),
      valorUnitarioEntrada: this.valorUnitarioEntrada
    };

    if (this.idEdicao !== null) {
      const id = this.idEdicao;

      this.entradaProdutoService.editarEntrada(id, dados).subscribe({
        next: () => {
          this.mensagem = 'Entrada atualizada com sucesso!';
          this.limparFormulario();
          this.listarEntradas();
        },
        error: (erro: unknown) => {
          console.error(erro);
          this.erro = 'Não foi possível atualizar a entrada. Verifique os dados informados.';
        }
      });
    } else {
      this.entradaProdutoService.cadastrarEntrada(dados).subscribe({
        next: () => {
          this.mensagem = 'Entrada registrada com sucesso!';
          this.limparFormulario();
          this.listarEntradas();
        },
        error: (erro: unknown) => {
          console.error(erro);
          this.erro = 'Não foi possível registrar a entrada. Verifique se o produto possui estoque cadastrado.';
        }
      });
    }
  }

  consultarPorId(): void {
    this.mensagem = '';
    this.erro = '';

    if (this.idBusca === null || this.idBusca <= 0) {
      this.erro = 'Informe um ID de entrada válido.';
      return;
    }

    this.entradaProdutoService.consultarEntrada(this.idBusca).subscribe({
      next: (entrada) => {
        this.entradas = [entrada];
        this.mensagem = 'Entrada encontrada.';
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Entrada não encontrada.';
      }
    });
  }

  editar(entrada: EntradaProduto): void {
    this.idEdicao = entrada.idEntradaProduto;
    this.idItem = entrada.idItem;
    this.dataEntradaProduto = entrada.dataEntradaProduto.substring(0, 10);
    this.quantidadeEntrada = entrada.quantidadeEntrada;
    this.unidade = entrada.unidade;
    this.valorUnitarioEntrada = entrada.valorUnitarioEntrada;

    this.mensagem = '';
    this.erro = '';
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir esta entrada?')) {
      return;
    }

    this.mensagem = '';
    this.erro = '';

    this.entradaProdutoService.excluirEntrada(id).subscribe({
      next: () => {
        this.mensagem = 'Entrada excluída com sucesso!';
        this.listarEntradas();
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Não foi possível excluir a entrada ou atualizar o estoque.';
      }
    });
  }

  limparFormulario(): void {
    this.idItem = null;
    this.dataEntradaProduto = '';
    this.quantidadeEntrada = null;
    this.unidade = '';
    this.valorUnitarioEntrada = null;
    this.idEdicao = null;
  }

  cancelarEdicao(): void {
    this.limparFormulario();
    this.mensagem = '';
    this.erro = '';
  }

  voltarLista(): void {
    this.idBusca = null;
    this.mensagem = '';
    this.erro = '';
    this.listarEntradas();
  }
}
