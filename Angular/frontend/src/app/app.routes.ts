
import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Login } from './pages/login/login';
import { Ecommerce } from './pages/ecommerce/ecommerce';
import { Produto } from './pages/produto/produto';
import { Pagamento } from './pages/pagamento/pagamento';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'inicio', pathMatch: 'full' },

    { path: 'inicio', component: Inicio },

    { path: 'login', component: Login },

    {
        path: 'ecommerce',
        component: Ecommerce,
        canActivate: [authGuard]
    },

    {
        path: 'produto/:id',
        component: Produto,
        canActivate: [authGuard]
    },

    {
        path: 'pagamento',
        component: Pagamento,
        canActivate: [authGuard]
    }

];
