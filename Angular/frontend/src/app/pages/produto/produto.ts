import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';

@Component({
  imports: [RouterLink, CommonModule],
  standalone: true,
  selector: 'app-produto',
  styleUrl: './produto.css',
  templateUrl: './produto.html'
})
export class Produto implements OnInit {

  produto: any;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.produtoService.buscarProdutoPorId(id).subscribe({
        next: (dados: any) => {
          this.produto = dados;
          this.cdr.markForCheck();
          console.log('Produto encontrado:', this.produto);
        },
        error: (erro) => {
          console.error('Erro ao buscar produto:', erro);
        }
      });
    }
  }
}