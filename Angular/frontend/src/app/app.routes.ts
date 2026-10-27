import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Ecommerce } from './pages/ecommerce/ecommerce';
import { Produto } from './pages/produto/produto';
import { Pagamento } from './pages/pagamento/pagamento';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio},
    { path: 'login', component: Login},
    { path: 'ecommerce', component: Ecommerce},
    { path: 'produto', component: Produto},
    { path: 'pagamento', component: Pagamento}
];
