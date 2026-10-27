import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ RouterLink ],
  standalone: true,
  selector: 'app-ecommerce',
  styleUrl: './ecommerce.css',
  templateUrl: './ecommerce.html'
})
export class Ecommerce {}
