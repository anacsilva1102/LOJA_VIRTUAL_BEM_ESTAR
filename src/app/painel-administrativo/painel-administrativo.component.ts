
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-painel-administrativo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './painel-administrativo.component.html',
  styleUrl: './painel-administrativo.component.css'
})
export class PainelAdministrativoComponent {
  opcoes = [
    {
      titulo: 'Início',
      descricao: 'Voltar para a página inicial da loja.',
      rota: '/inicio'
    },
    {
      titulo: 'Clientes',
      descricao: 'Consultar os clientes cadastrados.',
      rota: '/clientes'
    },
    {
      titulo: 'Categorias',
      descricao: 'Organizar as categorias dos itens.',
      rota: '/categorias'
    },
    {
      titulo: 'Produtos',
      descricao: 'Cadastrar e consultar produtos.',
      rota: '/gerenciamento-produtos'
    },
    {
      titulo: 'Serviços',
      descricao: 'Cadastrar e consultar serviços.',
      rota: '/gerenciamento-servicos'
    },
    {
      titulo: 'Pedidos',
      descricao: 'Consultar pedidos e acompanhar seus status.',
      rota: '/pedidos'
    },
    {
      titulo: 'Entrada de produtos',
      descricao: 'Registrar a entrada de produtos no estoque.',
      rota: '/entrada-produtos'
    },
    {
      titulo: 'Estoque',
      descricao: 'Consultar quantidades e disponibilidade dos itens.',
      rota: '/estoque'
    }
  ];
}
