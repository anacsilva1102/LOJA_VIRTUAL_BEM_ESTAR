
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

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'item-servico', component: ItemServicoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'painel-administrativo', component: PainelAdministrativoComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', redirectTo: 'inicio' }
];
