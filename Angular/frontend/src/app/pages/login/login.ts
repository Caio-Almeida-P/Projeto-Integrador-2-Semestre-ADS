import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ RouterLink ],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html'
})
export class Login {}
