import { Routes } from '@angular/router';
import { guardVerificadorGuard } from './guards/guard-verificador.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: ()=> import('./componentes/home/home.component').then(m => m.HomeComponent)
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
        loadComponent: ()=> import('./componentes/preguntados/preguntados.component').then(m => m.PreguntadosComponent),
        canActivate: [guardVerificadorGuard]
    },
    {
        path: 'chat',
        loadComponent: ()=> import('./componentes/chat/chat.component').then(m => m.ChatComponent)
    },
    {
        path: 'clickrush',
        loadComponent: ()=> import('./componentes/clickrush/clickrush.component').then(m => m.ClickrushComponent),
        canActivate: [guardVerificadorGuard]
    },
    {
        path: 'ahorcado',
        loadComponent: ()=> import('./componentes/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent),
        canActivate: [guardVerificadorGuard]
    },
    {
        path: 'mayormenor',
        loadComponent: ()=> import('./componentes/mayormenor/mayormenor.component').then(m => m.MayormenorComponent),
        canActivate: [guardVerificadorGuard]
    },
    // {
    //     path: 'error',
    //     loadComponent: ()=> import('./componentes/error-page/error-page.component').then(m => m.ErrorPageComponent) 
    // },
    {
        path: "**", 
        loadComponent: ()=> import('./componentes/error-page/error-page.component').then(m => m.ErrorPageComponent) 
    }, 
];