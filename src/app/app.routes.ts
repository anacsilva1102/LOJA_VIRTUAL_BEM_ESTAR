
import { Routes } from '@angular/router';
import { LojaComponent } from './loja/loja.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', component: LojaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: '**', redirectTo: '' }
];
