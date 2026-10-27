
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { ItemServicoService } from '../services/item-servico.service';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {
  produtos = signal<any[]>([]);
  servicos = signal<any[]>([]);
  pesquisa = signal('');
  categoriaSelecionada = signal('');
  carrinho = signal<any[]>(this.carregarCarrinho());

  mensagemCarrinho = '';
  mensagemErro = '';

  constructor(
    private produtoService: ProdutoService,
    private itemServicoService: ItemServicoService
  ) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: dados => {
        this.produtos.set(dados);
      },
      error: erro => {
        console.error('Erro ao carregar produtos:', erro);
        this.mensagemErro = 'Não foi possível carregar os produtos.';
      }
    });

    this.itemServicoService.listarServicos().subscribe({
      next: dados => {
        this.servicos.set(dados);
      },
      error: erro => {
        console.error('Erro ao carregar serviços:', erro);
      }
    });
  }

  produtosFiltrados = computed(() => {
    const termo = this.pesquisa().toLowerCase().trim();
    const categoria = this.categoriaSelecionada();

    return this.produtos().filter(produto => {
      const nome = String(produto.item ?? '').toLowerCase();
      const descricao = String(produto.descricaoItem ?? '').toLowerCase();
      const texto = `${nome} ${descricao}`;

      const correspondePesquisa =
        nome.includes(termo) || descricao.includes(termo);

      const correspondeCategoria =
        !categoria ||
        (categoria === 'pele' &&
          /pele|facial|sabonete|protetor solar|argila/.test(texto)) ||
        (categoria === 'cabelo' &&
          /cabelo|shampoo|condicionador/.test(texto)) ||
        (categoria === 'corpo' &&
          /corpo|hidratante corporal/.test(texto));

      return produto.tipoItem === 'P' &&
        produto.ativoProdutoServico === 'S' &&
        correspondePesquisa &&
        correspondeCategoria;
    });
  });

  servicosDisponiveis = computed(() =>
    this.servicos().filter(servico =>
      servico.ativoProdutoServico === 'S'
    )
  );

  obterPreco(item: any): number {
    return Number(
      item.precoVenda ?? item.precoItem ?? item.preco ?? 0
    );
  }

  totalCarrinho = computed(() =>
    this.carrinho().reduce(
      (total, item) => total + this.obterPreco(item),
      0
    )
  );

  carregarCarrinho(): any[] {
    try {
      const dados = localStorage.getItem('carrinho');
      const itens = dados ? JSON.parse(dados) : [];
      return Array.isArray(itens) ? itens : [];
    } catch {
      return [];
    }
  }

  salvarCarrinho(): void {
    try {
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho()));
    } catch (erro) {
      console.error('Erro ao salvar o carrinho:', erro);
      this.mensagemCarrinho = 'Não foi possível salvar o carrinho.';
    }
  }

  adicionarAoCarrinho(item: any): void {
    this.carrinho.update(lista => [...lista, item]);
    this.salvarCarrinho();
    this.mensagemCarrinho = `${item.item} foi adicionado ao carrinho.`;
  }

  adicionarEIrParaCarrinho(item: any): void {
    this.adicionarAoCarrinho(item);

    setTimeout(() => {
      document.getElementById('carrinho')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }

  removerDoCarrinho(index: number): void {
    this.carrinho.update(lista =>
      lista.filter((_, i) => i !== index)
    );

    this.salvarCarrinho();
    this.mensagemCarrinho = 'Item removido do carrinho.';
  }
}
