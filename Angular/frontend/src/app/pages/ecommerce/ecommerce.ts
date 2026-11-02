import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, CommonModule],
  standalone: true,
  selector: 'app-ecommerce',
  styleUrl: './ecommerce.css',
  templateUrl: './ecommerce.html'
})
export class Ecommerce implements OnInit {

  produtos: any[] = [];

  constructor(private produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (dados: any) => {
        this.produtos = dados;
        this.cdr.markForCheck();
        console.log('Produtos recebidos:', this.produtos);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos:', erro);
      }
    });
  }
}