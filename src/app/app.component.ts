import { Component, inject, OnInit } from '@angular/core';
import { AutentificadorUsuarios } from './servicios/autentificador-usuarios.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './componentes/footer/footer.component';
import { Router } from '@angular/router';
import { HeaderComponent } from "./componentes/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    auth = inject(AutentificadorUsuarios);
    private router = inject(Router);

    constructor() {
        console.log("app component construcor");
    }
  
    ngOnInit(): void {
        console.log("app component init");
      // Verificamos la sesión del usuario una vez que la app se inicializa
      this.auth.verificarSesion().then(() => {
        console.log('Sesión de usuario verificada en AppComponent.');
        this.router.navigate(["/home"]);
        // Aquí podrías emitir algún evento global si es necesario
      });
    }
  }
