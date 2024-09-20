import { Routes } from '@angular/router';
import { headerRoutes } from './componentes/header/header.routes';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: ()=> import('./componentes/home/home.component').then(m => m.HomeComponent),
        children: headerRoutes
    },
    {
        path: 'sobre-creador', 
        loadComponent: () => import('./componentes/sobre-mi/sobreMi').then(m => m.SobreMiComponent) 
    },   
    {
        path: 'login', 
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent) 
    },
    {
        path: 'login/registro', 
        loadComponent: () => import('./componentes/registro/registro.component').then(m => m.RegistroComponent) 
    },
    {
        path: 'preguntados',
        loadComponent: ()=> import('./componentes/preguntados/preguntados.component').then(m => m.PreguntadosComponent)
    },
    {
        path: 'chat',
        loadComponent: ()=> import('./componentes/chat/chat.component').then(m => m.ChatComponent)
    },
];