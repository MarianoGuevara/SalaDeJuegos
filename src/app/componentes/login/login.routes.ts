import { Routes } from '@angular/router';

export const loginRoutes: Routes = [
    {
        path: 'registro',
        loadComponent: ()=> import('../registro/registro.component').then(m => m.RegistroComponent)
    },
];