
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  produtos = signal<any[]>([]);
  mensagemErro = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos.set(
          dados.filter(produto =>
            String(produto.tipoItem ?? '').trim().toUpperCase() === 'P' &&
            String(produto.ativoProdutoServico ?? '').trim().toUpperCase() === 'S'
          )
        );
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.mensagemErro = 'Não foi possível carregar os produtos.';
      }
    });
  }

  obterPreco(produto: any): number {
    return Number(
      produto.precoVenda ?? produto.precoItem ?? produto.preco ?? 0
    );
  }

  adicionarAoCarrinho(produto: any): void {
    try {
      const dados = localStorage.getItem('carrinho');
      const carrinho = dados ? JSON.parse(dados) : [];

      carrinho.push({
        idItem: produto.idItem,
        item: produto.item,
        descricaoItem: produto.descricaoItem,
        precoItem: this.obterPreco(produto),
        tipoItem: 'P',
        quantidade: 1
      });

      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      this.router.navigate(['/carrinho']);
    } catch (erro) {
      console.error('Erro ao adicionar produto ao carrinho:', erro);
      this.mensagemErro = 'Não foi possível adicionar o produto ao carrinho.';
    }
  }
}
