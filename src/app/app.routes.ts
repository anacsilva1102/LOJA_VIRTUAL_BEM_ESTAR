import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ItemServicoComponent } from './item-servico/item-servico.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LojaComponent } from './loja/loja.component';
import { AdministracaoPedidosComponent } from './administracao-pedidos/administracao-pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'item-servico', component: ItemServicoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'administracao-pedidos', component: AdministracaoPedidosComponent },
  { path: '**', redirectTo: 'inicio' }
];
