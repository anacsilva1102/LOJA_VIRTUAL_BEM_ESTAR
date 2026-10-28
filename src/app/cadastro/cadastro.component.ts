
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PessoaEnderecoService } from '../services/pessoa-endereco.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cliente = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  };

  mensagemCliente = '';
  idPessoaCadastrada: number | null = null;

  constructor(private pessoaEnderecoService: PessoaEnderecoService) {}

  cadastrarCliente(): void {
    this.mensagemCliente = '';

    const camposObrigatorios = [
      this.cliente.nome,
      this.cliente.cpf,
      this.cliente.dataNascimento,
      this.cliente.sexo,
      this.cliente.email,
      this.cliente.telefone,
      this.cliente.cep,
      this.cliente.numero
    ];

    if (camposObrigatorios.some(campo => !String(campo).trim())) {
      this.mensagemCliente = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const cpf = Number(this.cliente.cpf.replace(/\D/g, ''));
    const telefone = Number(this.cliente.telefone.replace(/\D/g, ''));

    if (!Number.isSafeInteger(cpf) || !Number.isSafeInteger(telefone)) {
      this.mensagemCliente = 'Confira o CPF e o telefone informados.';
      return;
    }

    const dados = {
      nome: this.cliente.nome.trim(),
      cpf,
      dataNascimento: this.cliente.dataNascimento,
      sexo: this.cliente.sexo,
      email: this.cliente.email.trim(),
      telefone,
      ativoPessoa: 'S',
      enderecos: [
        {
          cep: this.cliente.cep.replace(/\D/g, ''),
          numero: this.cliente.numero.trim(),
          complemento: this.cliente.complemento.trim()
        }
      ]
    };

    this.pessoaEnderecoService.cadastrarPessoa(dados).subscribe({
      next: (resposta) => {
        const id = Number(resposta?.idpessoa ?? resposta?.idPessoa);

        this.idPessoaCadastrada =
          Number.isInteger(id) && id > 0 ? id : null;

        if (this.idPessoaCadastrada !== null) {
          localStorage.setItem(
            'idpessoa',
            String(this.idPessoaCadastrada)
          );
        }

        this.limparCliente();

        this.mensagemCliente = this.idPessoaCadastrada !== null
          ? `Cadastro realizado com sucesso! Código do cliente: ${this.idPessoaCadastrada}`
          : 'Cadastro realizado com sucesso!';
      },
      error: erro => {
        console.error('Erro ao cadastrar cliente:', erro);
        console.error('Detalhes retornados pela API:', erro.error);

        this.mensagemCliente =
          typeof erro.error === 'string'
            ? erro.error
            : erro.error?.message ||
              'Não foi possível realizar o cadastro. Confira o terminal da API.';
      }
    });
  }

  limparCliente(): void {
    this.cliente = {
      nome: '',
      cpf: '',
      dataNascimento: '',
      sexo: '',
      email: '',
      telefone: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    };

    this.mensagemCliente = '';
  }
}
