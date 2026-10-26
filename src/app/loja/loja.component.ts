
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {
  produtos = signal<any[]>([]);
  pesquisa = signal('');
  categoriaSelecionada = signal('');
  carrinho = signal<any[]>(this.carregarCarrinho());

  produtosFiltrados = computed(() => {
    const termo = this.pesquisa().toLowerCase().trim();
    const categoria = this.categoriaSelecionada();

    return this.produtos().filter(produto => {
      const nome = String(produto.item ?? '').toLowerCase();
      const descricao = String(produto.descricaoItem ?? '').toLowerCase();
      const textoProduto = `${nome} ${descricao}`;

      const correspondePesquisa =
        nome.includes(termo) || descricao.includes(termo);

      const correspondeCategoria =
        !categoria ||
        (categoria === 'pele' &&
          /pele|facial|sabonete|protetor solar|argila/.test(textoProduto)) ||
        (categoria === 'cabelo' &&
          /cabelo|shampoo|condicionador/.test(textoProduto)) ||
        (categoria === 'corpo' &&
          /corpo|hidratante corporal/.test(textoProduto));

      return correspondePesquisa && correspondeCategoria;
    });
  });

  totalCarrinho = computed(() =>
    this.carrinho().reduce(
      (total, produto) => total + Number(produto.precoItem ?? 0),
      0
    )
  );

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: dados => this.produtos.set(dados),
      error: erro => console.error('Erro ao carregar produtos:', erro)
    });
  }

  carregarCarrinho(): any[] {
    try {
      const dados = localStorage.getItem('carrinho');
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  salvarCarrinho(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho()));
  }

  adicionarAoCarrinho(produto: any): void {
    this.carrinho.update(itens => [...itens, produto]);
    this.salvarCarrinho();

    setTimeout(() => {
      document.getElementById('carrinho')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }

  removerDoCarrinho(index: number): void {
    this.carrinho.update(itens => itens.filter((_, i) => i !== index));
    this.salvarCarrinho();
  }
}
