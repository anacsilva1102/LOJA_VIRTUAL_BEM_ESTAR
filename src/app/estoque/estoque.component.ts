
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estoque, EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.css'
})
export class EstoqueComponent implements OnInit {
  estoques: Estoque[] = [];
  mensagem = '';
  erro = '';
  carregando = false;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.listarEstoques();
  }

  listarEstoques(): void {
    this.carregando = true;
    this.mensagem = '';
    this.erro = '';

    this.estoqueService.listarEstoques().subscribe({
      next: (dados) => {
        this.estoques = dados;
        this.carregando = false;
      },
      error: (erro: unknown) => {
        console.error(erro);
        this.erro = 'Não foi possível carregar os dados do estoque.';
        this.carregando = false;
      }
    });
  }
}
