
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto, ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-gerenciamento-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciamento-produtos.component.html',
  styleUrl: './gerenciamento-produtos.component.css'
})
export class GerenciamentoProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  idCategoria: number | null = null;
  nomeProduto = '';
  descricaoProduto = '';
  precoItem: number | null = null;
  codigoPreco = '';
  precoVenda: number | null = null;
  unidade = '';
  ativoProdutoServico = 'S';

  idBusca: number | null = null;
  idEdicao: number | null = null;

  mensagem = '';
  erro = '';
  carregando = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.carregando = true;

    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados.filter(
          produto =>
            String(produto.tipoItem).trim().toUpperCase() === 'P'
        );
        this.carregando = false;
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Não foi possível carregar os produtos.';
        this.carregando = false;
      }
    });
  }

  salvarProduto(): void {
    this.mensagem = '';
    this.erro = '';

    if (
      !this.nomeProduto.trim() ||
      !this.descricaoProduto.trim() ||
      this.idCategoria === null ||
      this.precoItem === null ||
      this.precoVenda === null ||
      !this.codigoPreco.trim() ||
      !this.unidade.trim()
    ) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    if (this.precoItem < 0 || this.precoVenda < 0) {
      this.erro = 'Os preços não podem ser negativos.';
      return;
    }

    const dados: Partial<Produto> = {
      idcategoria: this.idCategoria,
      item: this.nomeProduto.trim(),
      descricaoItem: this.descricaoProduto.trim(),
      precoItem: this.precoItem,
      tipoItem: 'P',
      ativoProdutoServico: this.ativoProdutoServico,
      codigoPreco: this.codigoPreco.trim(),
      precoVenda: this.precoVenda,
      unidade: this.unidade.trim()
    };

    if (this.idEdicao !== null) {
      const id = this.idEdicao;

      this.produtoService.editarProduto(id, dados).subscribe({
        next: () => {
          this.mensagem = 'Produto atualizado com sucesso!';
          this.cancelarEdicao();
          this.listarProdutos();
        },
        error: (erro: unknown) => {
          console.error(erro);
          this.erro = 'Não foi possível atualizar o produto.';
        }
      });
    } else {
      this.produtoService.cadastrarProduto(dados).subscribe({
        next: () => {
          this.mensagem = 'Produto cadastrado com sucesso!';
          this.limparFormulario();
          this.listarProdutos();
        },
        error: (erro: unknown) => {
          console.error(erro);
          this.erro = 'Não foi possível cadastrar o produto. Confira a categoria informada.';
        }
      });
    }
  }

  consultarPorId(): void {
    this.mensagem = '';
    this.erro = '';

    if (this.idBusca === null) {
      this.erro = 'Informe o ID do produto.';
      return;
    }

    this.produtoService.consultarProduto(this.idBusca).subscribe({
      next: (produto) => {
        if (String(produto.tipoItem).trim().toUpperCase() !== 'P') {
          this.erro = 'O ID informado não corresponde a um produto.';
          return;
        }

        this.produtos = [produto];
        this.mensagem = 'Produto encontrado.';
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Produto não encontrado.';
      }
    });
  }

  editar(produto: Produto): void {
    this.idEdicao = produto.idItem;
    this.idCategoria = produto.idcategoria;
    this.nomeProduto = produto.item;
    this.descricaoProduto = produto.descricaoItem;
    this.precoItem = produto.precoItem;
    this.codigoPreco = produto.codigoPreco;
    this.precoVenda = produto.precoVenda;
    this.unidade = produto.unidade;
    this.ativoProdutoServico = produto.ativoProdutoServico;

    this.mensagem = '';
    this.erro = '';
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    this.mensagem = '';
    this.erro = '';

    this.produtoService.excluirProduto(id).subscribe({
      next: () => {
        this.mensagem = 'Produto excluído com sucesso!';
        this.listarProdutos();
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Não foi possível excluir. O produto pode estar vinculado a entradas de estoque ou atendimentos.';
      }
    });
  }

  cancelarEdicao(): void {
    this.idEdicao = null;
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.idCategoria = null;
    this.nomeProduto = '';
    this.descricaoProduto = '';
    this.precoItem = null;
    this.codigoPreco = '';
    this.precoVenda = null;
    this.unidade = '';
    this.ativoProdutoServico = 'S';
    this.idEdicao = null;
  }

  voltarLista(): void {
    this.idBusca = null;
    this.mensagem = '';
    this.erro = '';
    this.listarProdutos();
  }
}
