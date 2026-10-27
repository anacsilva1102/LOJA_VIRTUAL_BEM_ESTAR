
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ItemServicoService } from '../services/item-servico.service';

@Component({
  selector: 'app-item-servico',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './item-servico.component.html',
  styleUrl: './item-servico.component.css'
})
export class ItemServicoComponent implements OnInit {
  servicos = signal<any[]>([]);
  mensagemErro = '';

  constructor(
    private itemServicoService: ItemServicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemServicoService.listarServicos().subscribe({
      next: (dados) => {
        this.servicos.set(
          dados.filter(servico =>
            String(servico.tipoItem ?? '').trim().toUpperCase() === 'S' &&
            String(servico.ativoProdutoServico ?? '').trim().toUpperCase() === 'S'
          )
        );
      },
      error: (erro) => {
        console.error('Erro ao carregar serviços:', erro);
        this.mensagemErro = 'Não foi possível carregar os serviços.';
      }
    });
  }

  obterPreco(servico: any): number {
    return Number(
      servico.preco ?? servico.precoItem ?? servico.precoVenda ?? 0
    );
  }

  agendar(servico: any): void {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    carrinho.push({
      idItem: servico.idItem,
      item: servico.item,
      descricaoItem: servico.descricaoItem,
      precoItem: this.obterPreco(servico),
      tipoItem: 'S',
      quantidade: 1
    });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    this.router.navigate(['/carrinho']);
  }
}
