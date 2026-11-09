import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html'
})
export class Login {

  email = '';
  senha = '';
  mensagemErro = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  entrar() {

    this.mensagemErro = '';

    this.authService.login(this.email, this.senha).subscribe({

      next: (resposta: any) => {

        localStorage.setItem('token', resposta.token);

        this.router.navigate(['/ecommerce']);

      },

      error: (erro) => {

        this.mensagemErro =
          erro.error?.erro || 'Erro ao realizar login.';

      }

    });

  }
}