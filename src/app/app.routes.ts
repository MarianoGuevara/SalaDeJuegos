import { Routes } from '@angular/router';
import { headerRoutes } from './componentes/header/header.routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./componentes/header/header.component').then(m => m.HeaderComponent),
        children: headerRoutes
    },
];