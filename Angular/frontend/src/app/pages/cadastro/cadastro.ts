
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})

export class Cadastro {

  nome = '';
  sobrenome = '';
  data_nascimento = '';
  email = '';
  CPF = '';
  senha = '';

  mensagemErro = '';
  mensagemSucesso = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

}
