import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CartComponent } from './components/cart/cart.component';
import { CartAppComponent } from './components/cart-app.component';


export const routes: Routes = [
    {
        path: '', // Ruta por defecto
        pathMatch: 'full', // Ruta exacta
        redirectTo: '/users', // Redirige a la ruta 'users'
    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuard],
    },
    {
        path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [authGuard],
    },
    {
        path: 'login',
        component: AuthComponent,
    },
    {
        path: 'forbidden',
        component: Forbidden403Component,
    },
    {
        path: 'products',
        component: CatalogComponent,
        
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
        //component: CartAppComponent
        
    },
  
];
