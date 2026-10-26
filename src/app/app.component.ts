import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  produtos = signal<any[]>([]);
  pesquisa = signal('');
  categoriaSelecionada = signal('');

  produtosFiltrados = computed(() => {
    const termo = this.pesquisa().toLowerCase().trim();
    const categoria = this.categoriaSelecionada();

    return this.produtos().filter(produto => {
      const nome = String(produto.item ?? '').toLowerCase();
      const descricao = String(produto.descricaoItem ?? '').toLowerCase();

      const correspondePesquisa =
        nome.includes(termo) || descricao.includes(termo);

      const textoProduto = `${nome} ${descricao}`;

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

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: dados => this.produtos.set(dados),
      error: erro => console.error('Erro ao carregar produtos:', erro)
    });
  }
}
