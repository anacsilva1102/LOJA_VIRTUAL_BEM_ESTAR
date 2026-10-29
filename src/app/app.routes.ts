
import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ItemServicoComponent } from './item-servico/item-servico.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { GerenciamentoServicosComponent } from './gerenciamento-servicos/gerenciamento-servicos.component';
import { GerenciamentoProdutosComponent } from './gerenciamento-produtos/gerenciamento-produtos.component';
import { EntradaProdutosComponent } from './entrada-produtos/entrada-produtos.component';
import { EstoqueComponent } from './estoque/estoque.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'gerenciamento-produtos', component: GerenciamentoProdutosComponent },
  { path: 'item-servico', component: ItemServicoComponent },
  { path: 'gerenciamento-servicos', component: GerenciamentoServicosComponent },
  { path: 'entrada-produtos', component: EntradaProdutosComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'painel-administrativo', component: PainelAdministrativoComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', redirectTo: 'inicio' }
];
