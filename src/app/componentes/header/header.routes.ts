import { Routes } from '@angular/router';

export const headerRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'home', 
        pathMatch: "full"
    },
    {
        path: 'home', 
        loadComponent: () => import('../home/home.component').then(m => m.HomeComponent) 
    },
    {
        path: 'sobre-creador', 
        loadComponent: () => import('../sobre-mi/sobreMi').then(m => m.SobreMiComponent) 
    },   
]