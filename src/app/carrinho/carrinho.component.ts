import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  carrinho = signal<any[]>([]);
  mensagem = '';
  cep = '';
  formaPagamento = '';
  frete = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    try {
      const dados = localStorage.getItem('carrinho');
      const itens = dados ? JSON.parse(dados) : [];

      this.carrinho.set(
        Array.isArray(itens)
          ? itens.map(item => ({
              ...item,
              quantidade: Math.max(1, Number(item.quantidade) || 1)
            }))
          : []
      );

      this.salvarCarrinho();
    } catch (erro) {
      console.error('Erro ao carregar carrinho:', erro);
      this.carrinho.set([]);
    }
  }

  obterPreco(item: any): number {
    return Number(
      item.precoVenda ?? item.precoItem ?? item.preco ?? 0
    );
  }

  obterFrete(): number {
    return this.carrinho().some(item => item.tipoItem === 'P')
      ? this.frete
      : 0;
  }

  totalCarrinho = computed(() =>
    this.carrinho().reduce(
      (total, item) =>
        total + this.obterPreco(item) * item.quantidade,
      0
    )
  );

  totalPagar = computed(() =>
    this.totalCarrinho() + this.obterFrete()
  );

  alterarQuantidade(index: number, quantidade: number): void {
    if (!Number.isFinite(quantidade) || quantidade < 1) {
      return;
    }

    this.carrinho.update(lista =>
      lista.map((item, i) =>
        i === index
          ? { ...item, quantidade: Math.floor(quantidade) }
          : item
      )
    );

    this.salvarCarrinho();
    this.mensagem = '';
  }

  removerDoCarrinho(index: number): void {
    this.carrinho.update(lista =>
      lista.filter((_, i) => i !== index)
    );

    this.salvarCarrinho();
    this.mensagem = 'Item removido do carrinho.';
  }

  salvarCarrinho(): void {
    try {
      localStorage.setItem(
        'carrinho',
        JSON.stringify(this.carrinho())
      );
    } catch (erro) {
      console.error('Erro ao salvar o carrinho:', erro);
      this.mensagem = 'Não foi possível salvar o carrinho.';
    }
  }

  continuarComprando(): void {
    this.router.navigate(['/produtos']);
  }

  finalizarAgendamento(): void {
    if (this.carrinho().length === 0) {
      this.mensagem = 'Seu carrinho está vazio.';
      return;
    }

    if (
      this.carrinho().some(item => item.tipoItem === 'P') &&
      !/^[0-9]{8}$/.test(this.cep.replace(/\D/g, ''))
    ) {
      this.mensagem = 'Informe um CEP válido com 8 números.';
      return;
    }

    if (!this.formaPagamento) {
      this.mensagem = 'Selecione uma forma de pagamento.';
      return;
    }

    this.mensagem =
      'Pedido conferido! A gravação do pedido ainda precisa ser integrada à API.';
  }
}
