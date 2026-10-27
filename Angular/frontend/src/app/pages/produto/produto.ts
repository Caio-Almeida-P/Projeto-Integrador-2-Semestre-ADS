import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ RouterLink ],
  standalone: true,
  selector: 'app-produto',
  styleUrl: './produto.css',
  templateUrl: './produto.html'
})
export class Produto {}
