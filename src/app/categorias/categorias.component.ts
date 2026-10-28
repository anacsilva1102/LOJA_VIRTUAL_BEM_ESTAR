
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Categoria, CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  nomeCategoria = '';
  idBusca: number | null = null;
  idEdicao: number | null = null;
  mensagem = '';
  erro = '';
  carregando = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.carregando = true;
    this.erro = '';
    this.mensagem = '';

    this.categoriaService.listarCategorias().subscribe({
      next: dados => {
        this.categorias = dados;
        this.carregando = false;
      },
      error: erro => {
        console.error('Erro ao listar categorias:', erro);
        this.erro = 'Não foi possível carregar as categorias.';
        this.carregando = false;
      }
    });
  }

  salvarCategoria(): void {
    const nome = this.nomeCategoria.trim();

    if (!nome) {
      this.erro = 'Informe o nome da categoria.';
      this.mensagem = '';
      return;
    }

    this.erro = '';
    this.mensagem = '';

    const dados = { categoria: nome };

    const requisicao = this.idEdicao !== null
      ? this.categoriaService.editarCategoria(this.idEdicao, dados)
      : this.categoriaService.cadastrarCategoria(dados);

    requisicao.subscribe({
      next: () => {
        this.mensagem = this.idEdicao !== null
          ? 'Categoria atualizada com sucesso!'
          : 'Categoria cadastrada com sucesso!';

        this.nomeCategoria = '';
        this.idEdicao = null;
        this.listarCategorias();
      },
      error: erro => {
        console.error('Erro ao salvar categoria:', erro);
        this.erro = 'Não foi possível salvar a categoria. Confira os dados enviados à API.';
      }
    });
  }

  editar(categoria: Categoria): void {
    this.idEdicao = categoria.idcategoria;
    this.nomeCategoria = categoria.categoria;
    this.mensagem = '';
    this.erro = '';
  }

  excluir(categoria: Categoria): void {
    const confirmar = window.confirm(
      `Deseja excluir a categoria "${categoria.categoria}"?`
    );

    if (!confirmar) {
      return;
    }

    this.erro = '';
    this.mensagem = '';

    this.categoriaService.excluirCategoria(categoria.idcategoria).subscribe({
      next: () => {
        this.mensagem = 'Categoria excluída com sucesso!';
        this.listarCategorias();
      },
      error: erro => {
        console.error('Erro ao excluir categoria:', erro);
        this.erro = 'Não foi possível excluir. Verifique se existem itens vinculados a essa categoria.';
      }
    });
  }

  consultarPorId(): void {
    if (this.idBusca === null || !Number.isInteger(Number(this.idBusca)) || Number(this.idBusca) <= 0) {
      this.erro = 'Informe um ID válido.';
      this.mensagem = '';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.mensagem = '';

    this.categoriaService.consultarCategoria(Number(this.idBusca)).subscribe({
      next: categoria => {
        this.categorias = [categoria];
        this.carregando = false;
      },
      error: erro => {
        console.error('Erro ao consultar categoria:', erro);
        this.categorias = [];
        this.erro = erro.status === 404
          ? 'Categoria não encontrada.'
          : 'Não foi possível consultar a categoria.';
        this.carregando = false;
      }
    });
  }

  cancelarEdicao(): void {
    this.idEdicao = null;
    this.nomeCategoria = '';
    this.erro = '';
    this.mensagem = '';
  }
}
